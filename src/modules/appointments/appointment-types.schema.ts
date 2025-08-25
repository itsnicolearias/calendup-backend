import z, { ZodType } from "zod";

export const createAppointmentTypeSchema: ZodType = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().optional(),
  sessionType: z.string().optional(),
});

export const updateAppointmentTypeSchema: ZodType = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  sessionType: z.string().optional(),
});