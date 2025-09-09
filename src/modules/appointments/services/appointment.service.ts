import Boom from '@hapi/boom';
import BaseService from '../../base/base.service';
import { CreateAppointmentParams, IAppointmentService } from '../interfaces/appointment.interface';
import { User } from '../../../models/user';
import { Profile } from '../../../models/profile';
import { checkAvailability } from '../../../utils/check-professional-availability';
import { sendEmail } from '../../../libs/nodemailer';
import { config } from '../../../config/environments';
import { Appointment } from '../../../models/appointment';
import { decodeToken, generateAppModificationToken, generateGenericToken } from '../../../utils/jwt';
import { CheckAvailabilityBody } from '../../professionals/professional.interface';
import { Op } from 'sequelize';
import { GenerateAppCode } from '../../../utils/generate-app-code';

class AppointmentService extends BaseService<Appointment> implements IAppointmentService {
  constructor() {
    super(Appointment);
  }
  
  // obtain and update one appointment from a magic link with a jwt, for users that are not logged in
  async getOneAppointment(token: string): Promise<Appointment> {
    try {
      const verifyToken = decodeToken(token, config.jwtUserSecret!)

      const appointmentId = verifyToken.appointmentId

      const appointment = await super.getOne({appointmentId: appointmentId}, [{model: User, include: Profile}])

      return appointment;
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }
  
  async updateAppointment(body: Partial<CreateAppointmentParams>, token: string): Promise<Appointment> {
    try {
      const verifyToken = decodeToken(token, config.jwtUserSecret!)

      const appointmentId = verifyToken.appointmentId

      const updatedAppointment = await this.update(body, {appointmentId: appointmentId})

      return updatedAppointment;
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }

  async create(body: CreateAppointmentParams, professionalId?: string, include?: any[]): Promise<Appointment> {
      try {
        const professional = await User.findOne({
          where: { userId: body.professionalId },
          include: [Appointment, Profile]
        });
        if (!professional) {
          throw Boom.notFound('Professional not found');
        }

        if (!professional.profile.profileCompleted){
          throw Boom.forbidden('Professional must configure profile')
        }

        checkAvailability({date: body.date, time: body.time, appointments: professional.appointments, availability: professional.profile.availability!})
        
        if (professional.profile.defaultAppConfirmation) {
          body.status = "confirmed";
        } else {
          body.status = "pending"
        }

        body.appointmentCode = GenerateAppCode(professional.profile.lastName);
        
        const appointment = await super.create(body, professionalId, include);

        const token = generateAppModificationToken({appointmentId: appointment.appointmentId}, config.jwtUserSecret!, appointment.date)

        if (body.status === "confirmed"){
          //notify user
        await sendEmail({
          to: body.email,
          subject: "Turno agendado correctamente",
          text: 
          `Has agendado un turno en CalendUp, consulta los detalles aqui:
           fecha: ${body.date}
           hora: ${body.time}
           profesional: ${professional.profile.name} ${professional.profile.lastName} - ${professional.profile.jobTitle}

          Puedes consultar o modificar tu turno desde aqui ${config.urlFront}/appointments/user-view/${appointment.appointmentId}?authorization=${token} `
        })

        //notify professional
        await sendEmail({
          to: professional.email,
          subject: "Has recibido un nuevo turno en CalendUp",
          text:  
          `Se ha agendado un nuevo turno en tu cuenta
           fecha: ${body.date}
           hora: ${body.time}
           nombre del paciente: ${body.name} ${body.lastName}
           Puedes consultar todos los detalles del turno aqui ${config.urlFront}/appointments/${appointment.appointmentId}`
        })
        } else {
           //notify user
        await sendEmail({
          to: body.email,
          subject: "Turno agendado correctamente",
          text: 
          `Has agendado un turno en CalendUp, el turno esta pendiente de confimacion, te avisaremos cuando el profesional confirme el turno.
           fecha: ${body.date}
           hora: ${body.time}
           profesional: ${professional.profile.name} ${professional.profile.lastName} - ${professional.profile.jobTitle}

          Puedes consultar o modificar tu turno desde aqui ${config.urlFront}/appointments/user-view/${appointment.appointmentId}?authorization=${token} `
        })

        //notify professional
        await sendEmail({
          to: professional.email,
          subject: "Nuevo turno pendiente de confirmacion",
          text:  
          `Se ha agendado un nuevo turno en tu cuenta,
           fecha: ${body.date}
           hora: ${body.time}
           nombre del paciente: ${body.name} ${body.lastName}
           Puedes consultar todos los detalles del turno aqui ${config.urlFront}/appointments/${appointment.appointmentId}`
        })
        }
        
        return appointment;
      } catch (error) {
        throw Boom.badRequest(error);
      }
  }

  async update(body: Partial<CreateAppointmentParams>, where: Record<string, unknown>, professionalId?: string): Promise<Appointment> {
    try {
      const app = await Appointment.findOne({
        where,
        include: [
          {model: User, include: [Profile, Appointment]}
        ]
      })

      if (!app){
        throw Boom.notFound("Appointment not found")
      }

      if (!app.professional.profile.availability){
        throw Boom.forbidden("Professional must configure profile")
      }

      // chequear disponibilidad antes de actualizar
      if (body?.date || body?.time){
        const availabilityBody: CheckAvailabilityBody = {
          date: body.date!,
          time: body.time!,
          appointments: app.professional.appointments,
          availability: app.professional.profile.availability
          
        }
        checkAvailability(availabilityBody)
      }

      // actualizar
      const updatedApp = await super.update(body, where)
      
      // notificar a los usuarios
      const token = generateAppModificationToken({appointmentId: app.appointmentId}, config.jwtUserSecret!, updatedApp.date)
      if (body?.date || body?.time){
        //notify user
        await sendEmail({
          to: app.email,
          subject: "Su turno ha sido reagendado",
          text: 
          `Su turno agendado en CalendUp ha sido reagendado, 
          fecha: ${body.date},
          hora: ${body.time}
          Consulte los detalles aqui ${config.urlFront}/appointments/user-view/${app.appointmentId}?authorization=${token} `
        })

        //notify professional
        await sendEmail({
          to: app.professional.email,
          subject: "Su turno ha sido reagendado",
          text:  
          `Su turno agendado en CalendUp ha sido reagendado,
          fecha: ${body.date},
          hora: ${body.time}
          Consulte los detalles aqui ${config.urlFront}/appointments/${app.appointmentId}`
        })
      }

      if (body.status === "confirmed"){
         //notify user
        await sendEmail({
          to: app.email,
          subject: "Su turno ha sido confirmado",
          text: 
          `Su turno turno agendado en CalendUp ha sido confirmado:
           fecha: ${app.date}
           hora: ${app.time}
           profesional: ${app.professional.profile.name} ${app.professional.profile.lastName} - ${app.professional.profile.jobTitle}

          Puedes consultar o modificar tu turno desde aqui ${config.urlFront}/appointments/user-view/${app.appointmentId}?authorization=${token} `
        })

        //notify professional
        await sendEmail({
          to: app.professional.email,
          subject: "Turno confirmado correctamente",
          text:  
          `Has confirmado el turno correctamente
           fecha: ${app.date}
           hora: ${app.time}
           nombre del paciente: ${app.name} ${app.lastName}
           Puedes consultar todos los detalles del turno aqui ${config.urlFront}/appointments/${app.appointmentId}`
        })
      }

      if (body.status === "cancelled"){
        //notify user
        await sendEmail({
          to: app.email,
          subject: "Se ha cancelado su turno",
          text: 
          `Su turno agendado en CalendUp ha sido cancelado, 
          consulte los detalles aqui ${config.urlFront}/appointments/user-view/${app.appointmentId}?authorization=${token} `
        })

        //notify professional
        await sendEmail({
          to: app.professional.email,
          subject: "Se ha cancelado su turno",
          text:  
          `Su turno agendado en CalendUp ha sido cancelado, consulte los detalles aqui ${config.urlFront}/appointments/${app.appointmentId}`
        })
      }

      if (body.status === "completed"){

        const completedToken = generateGenericToken({appointmentId: app.appointmentId}, config.jwtUserSecret!)
        //notify user
        await sendEmail({
          to: app.email,
          subject: "Califica tu experiencia",
          text: 
          `Su turno agendado en CalendUp ha sido completado puedes calificar tu experiencia con el profesional aqui: ${config.urlFront}/appointments/reviews/create?authorization=${completedToken}&professionalId=${app.professionalId} `
        })
      }

      return updatedApp;      
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }
}

export async function autoCompleteAppointments() {
  try {
    const now = new Date();

  // 1️⃣ Buscar los IDs de los turnos que cumplen las condiciones
  const appointments = await Appointment.findAll({
    where: {
      status: "confirmed",
      date: { [Op.lt]: now },
    },
    include: [
      {
        model: User,
        include: [
          {
        model: Profile,
        as: "profile",
        where: { markAppAsCompleted: true },
        attributes: [], // no necesitamos datos del profile
      },
        ]
      }
      
    ],
    attributes: ["appointmentId"],
    raw: true,
  });

  const idsToUpdate = appointments.map((a) => a.appointmentId);
  if (idsToUpdate.length === 0) return;

  // 2️⃣ Actualizar solo esos IDs
  await Appointment.update(
    { status: "completed" },
    {
      where: { appointmentId: { [Op.in]: idsToUpdate } },
    }
  );

  appointments.forEach(async (app) => {
    const completedToken = generateGenericToken({ appointmentId: app.appointmentId }, config.jwtUserSecret!);
    // Notify user
    await sendEmail({
      to: app.email,
      subject: "Califica tu experiencia",
      text: `Su turno agendado en CalendUp ha sido completado puede calificar su experiencia con el profesional aqui: ${config.urlFront}/appointments/reviews/create?authorization=${completedToken}&professionalId=${app.professionalId}`
    });
  });
  } catch (error) {
    throw Boom.badRequest(error);
  }
  
}


export default new AppointmentService();
