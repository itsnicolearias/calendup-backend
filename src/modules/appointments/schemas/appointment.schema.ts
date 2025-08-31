import { z, ZodType } from 'zod';
import { AppointmentStatusConst } from '../interfaces/appointment.interface';

export const createAppointmentSchema: ZodType = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  professionalId: z.uuidv4(),
  email: z.email(),
  phone: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  reason: z.string().optional(),
  appointmentTypeId: z.uuidv4().optional().nullable(),
  
});

export const updateAppointmentSchema: ZodType = z.object({
  name: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  reason: z.string().optional(),
  status: z.enum(AppointmentStatusConst).optional(),
  appointmentTypeId: z.uuidv4().optional().nullable(),
});
