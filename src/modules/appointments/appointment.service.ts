import Boom from '@hapi/boom';
import BaseService from '../base/base.service';
import { CreateAppointmentParams, IAppointmentService } from './appointment.interface';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { checkAvailability } from '../../utils/check-professional-availability';
import { sendEmail } from '../../libs/nodemailer';
import { config } from '../../config/environments';
import { Appointment } from '../../models/appointment';
import { decodeToken, generateGenericToken } from '../../utils/jwt';
import { CheckAvailabilityBody } from '../professionals/professional.interface';

class AppointmentService extends BaseService<Appointment> implements IAppointmentService {
  constructor() {
    super(Appointment);
  }
  
  // obtain and update one appointment from a magic link with a jwt, for users that are not logged in
  async getOneAppointment(token: string): Promise<Appointment> {
    try {
      const verifyToken = decodeToken(token, config.jwtUserSecret!)

      const appointmentId = verifyToken.appointmentId

      const appointment = await super.getOne({appointmentId: appointmentId})

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

        if (!professional.profile.availability){
          throw Boom.forbidden('Professional must configure profile')
        }

        checkAvailability({date: body.date, time: body.time, appointments: professional.appointments, availability: professional.profile.availability})

        body.status = "confirmed";
        const appointment = await super.create(body, professionalId, include);

        const token = generateGenericToken({appointmentId: appointment.appointmentId}, config.jwtUserSecret!)

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

      const token = generateGenericToken({appointmentId: app.appointmentId}, config.jwtUserSecret!)

      if (body?.date || body?.time){
        const availabilityBody: CheckAvailabilityBody = {
          date: body.date!,
          time: body.time!,
          appointments: app.professional.appointments,
          availability: app.professional.profile.availability
          
        }
        checkAvailability(availabilityBody)

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
      const updatedApp = await super.update(body, where)

      return updatedApp;      
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }
}

export default new AppointmentService();
