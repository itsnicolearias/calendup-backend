import { Router } from 'express';
import * as controller from '../modules/appointments/appointment.controller';
import { validate } from '../middlewares/zod-validation';
import { createAppointmentSchema, updateAppointmentSchema } from '../modules/appointments/appointment.schema';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', auth, controller.getAppointments);
router.get('/:id', auth, controller.getAppointment);
router.post('/', validate(createAppointmentSchema, "body"), controller.createAppointment);
router.put('/:id', auth, validate(updateAppointmentSchema, "body"), controller.updateAppointment);
router.delete('/:id', auth, controller.deleteAppointment);

export default router;
