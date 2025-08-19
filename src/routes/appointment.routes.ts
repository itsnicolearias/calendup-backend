import { Router } from 'express';
import * as controller from '../modules/appointments/appointment.controller';
import * as typeController from '../modules/appointments/appointment-types.controller';
import { validate } from '../middlewares/zod-validation';
import { createAppointmentSchema, updateAppointmentSchema } from '../modules/appointments/appointment.schema';
import { auth } from '../middlewares/auth';
import { createAppointmentTypeSchema, updateAppointmentTypeSchema } from '../modules/appointments/appointment-types.schema';

const router = Router();
router.get('/appointment-types', auth, typeController.getAppointmentTypes);
router.get('/appointment-types/:id', auth, typeController.getAppointmentType);
router.post('/appointment-types', auth, validate(createAppointmentTypeSchema, "body"), typeController.createAppointmentType);
router.put('/appointment-types/:id', auth, validate(updateAppointmentTypeSchema, "body"), typeController.updateAppointmentType);
router.delete('/appointment-types/:id', auth, typeController.deleteAppointmentType);

router.get('/from-user', controller.getAppFromUser);
router.put('/from-user', validate(updateAppointmentSchema, "body"), controller.UpdateAppFromUser);

router.get('/', auth, controller.getAppointments);
router.get('/:id', auth, controller.getAppointment);
router.post('/', validate(createAppointmentSchema, "body"), controller.createAppointment);
router.put('/:id', auth, validate(updateAppointmentSchema, "body"), controller.updateAppointment);
router.delete('/:id', auth, controller.deleteAppointment);

export default router;
