import z from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
})


export const supportMessageSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.email("Debe ser un correo válido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type SupportMessageInput = z.infer<typeof supportMessageSchema>;
