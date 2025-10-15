import { Router } from 'express';
import * as typeController from '../modules/appointments/controllers/appointment-types.controller';
import { validate } from '../middlewares/zod-validation';
import { auth } from '../middlewares/auth';
import { createAppointmentTypeSchema, updateAppointmentTypeSchema } from '../modules/appointments/schemas/appointment-types.schema';
import { checkFeatureAccess } from '../middlewares/checkFeatureAccess';

const router = Router();
router.get('/', auth, checkFeatureAccess("services"), typeController.getAppointmentTypes);
router.get('/:id', auth, checkFeatureAccess("services"), typeController.getAppointmentType);
router.post('/', auth, checkFeatureAccess("services"), validate(createAppointmentTypeSchema, "body"), typeController.createAppointmentType);
router.put('/:id', auth, checkFeatureAccess("services"), validate(updateAppointmentTypeSchema, "body"), typeController.updateAppointmentType);
router.delete('/:id', auth, checkFeatureAccess("services"), typeController.deleteAppointmentType);

export default router;
