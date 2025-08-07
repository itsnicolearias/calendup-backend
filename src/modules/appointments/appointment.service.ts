import Boom from '@hapi/boom';
import Database from '../../libs/sequelize';
import BaseService from '../base/base.service';
import { CreateAppointmentParams } from './appointment.interface';
import { User } from '../../models/user';

const { Appointment } = Database.models;

class AppointmentService extends BaseService {
  constructor() {
    super(Appointment);
  }

  async create(body: any, professionalId?: string, include?: any[]): Promise<any> {
      try {

        const professional = await User.findOne({
          where: { userId: body.professionalId },
        });
        if (!professional) {
          throw Boom.notFound('Professional not found');
        }

        const appointment = await super.create(body, professionalId, include);
        return appointment;
      } catch (error) {
        throw Boom.badRequest(error);
      }
  }
}

export default new AppointmentService();
