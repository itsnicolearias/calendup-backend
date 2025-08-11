import Boom from '@hapi/boom';
import Database from '../../libs/sequelize';
import BaseService from '../base/base.service';
import { AppointmentStatus, CreateAppointmentParams } from './appointment.interface';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { checkAvailability } from '../../utils/check-professional-availability';
import { sendEmail } from '../../libs/nodemailer';
import { config } from '../../config/environments';

const { Appointment } = Database.models;

class AppointmentService extends BaseService {
  constructor() {
    super(Appointment);
  }

  async create(body: CreateAppointmentParams, professionalId?: string, include?: any[]): Promise<any> {
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

        body.status = AppointmentStatus[1]
        const appointment = await super.create(body, professionalId, include);

        //notify user
        await sendEmail({
          to: body.email,
          subject: "Turno agendado correctamente",
          text: 
          `Has agendado un turno en CalendUp, consulta los detalles aqui:
           fecha: ${body.date}
           hora: ${body.time}
           profesional: ${professional.profile.name} ${professional.profile.lastName} - ${professional.profile.jobTitle}

          Presiona aqui para reagendar o cancelar tu turno`
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
           Consulta todos los detalles aqui ${config.urlFront}/appointments/${appointment.appointmentId} `
        })
        return appointment;
      } catch (error) {
        throw Boom.badRequest(error);
      }
  }
}

export default new AppointmentService();
