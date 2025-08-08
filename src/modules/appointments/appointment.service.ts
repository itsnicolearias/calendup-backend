import Boom from '@hapi/boom';
import Database from '../../libs/sequelize';
import BaseService from '../base/base.service';
import { CreateAppointmentParams } from './appointment.interface';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { checkAvailability } from '../../utils/check-professional-availability';

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

        const appointment = await super.create(body, professionalId, include);
        return appointment;
      } catch (error) {
        throw Boom.badRequest(error);
      }
  }
}

export default new AppointmentService();
