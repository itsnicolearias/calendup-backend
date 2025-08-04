import { z } from "zod"

export const registerSchema = z.object({
  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(1, "lastName is required"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password is required"),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const verifySchema = z.object({
  token: z.string().min(1, "Token is required"),
})

export type VerifySchema = z.infer<typeof verifySchema>