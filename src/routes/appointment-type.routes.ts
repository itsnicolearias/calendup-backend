import { Router } from 'express';
import * as typeController from '../modules/appointments/controllers/appointment-types.controller';
import { validate } from '../middlewares/zod-validation';
import { auth } from '../middlewares/auth';
import { createAppointmentTypeSchema, updateAppointmentTypeSchema } from '../modules/appointments/schemas/appointment-types.schema';

const router = Router();
router.get('/', auth, typeController.getAppointmentTypes);
router.get('/:id', auth, typeController.getAppointmentType);
router.post('/', auth, validate(createAppointmentTypeSchema, "body"), typeController.createAppointmentType);
router.put('/:id', auth, validate(updateAppointmentTypeSchema, "body"), typeController.updateAppointmentType);
router.delete('/:id', auth, typeController.deleteAppointmentType);

export default router;
