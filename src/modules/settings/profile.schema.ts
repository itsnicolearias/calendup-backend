import { z } from "zod"

const timeRangeSchema = z.object({
  start: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
      message: "El formato de hora debe ser HH:mm",
    }),
  end: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
      message: "El formato de hora debe ser HH:mm",
    }),
}).refine(({ start, end }) => start < end, {
  message: "La hora de inicio debe ser anterior a la hora de fin",
})

const availabilitySchema = z.object({
  monday: z.array(timeRangeSchema).optional(),
  tuesday: z.array(timeRangeSchema).optional(),
  wednesday: z.array(timeRangeSchema).optional(),
  thursday: z.array(timeRangeSchema).optional(),
  friday: z.array(timeRangeSchema).optional(),
  saturday: z.array(timeRangeSchema).optional(),
  sunday: z.array(timeRangeSchema).optional(),
})

const insuranceProviders = z.object({
  name: z.string().optional(),
  plan: z.string().optional(),
  notes: z.string().optional()
})

export const createProfileSchema = z.object({
    name: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    jobTitle: z.string().optional(),
    availability: availabilitySchema.optional(),
    appointmentDuration: z.number().optional(),
    insuranceProviders: z.array(insuranceProviders).optional(),
    defaultAppConfirmation: z.boolean().optional(),
    markAppAsCompleted: z.boolean().optional(),
    licenseNumber: z.string().optional(),
    profilePicture: z.string().optional(),
    languages: z.array(z.string()).optional(),
    education: z.array(
    z.object({
      title: z.string().min(1, "Título requerido"),
      institution: z.string().min(1, "Institución requerida"),
    })
    ).optional(),
    country: z.string().optional(),
    province: z.string().optional(),
    city: z.string().optional()
})

export const updateProfileSchema = createProfileSchema

