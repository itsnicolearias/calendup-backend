import { z, ZodType } from 'zod';
import { AppointmentStatus, AppointmentType } from './appointment.interface';

export const createAppointmentSchema: ZodType = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  professionalId: z.uuidv4(),
  email: z.email(),
  phone: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  reason: z.string().optional(),
  appointmentType: z.enum(AppointmentStatus).optional(),
  
});

export const updateAppointmentSchema: ZodType = z.object({
  name: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  professionalId: z.uuidv4().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  reason: z.string().optional(),
  status: z.enum(AppointmentStatus).optional(),
  appointmentType: z.enum(AppointmentType).optional(),
});
