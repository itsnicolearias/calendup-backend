import z from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
})