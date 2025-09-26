export interface RegisterUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface VerifyEmailParams {
  token: string
}

export enum UserRole {
    PROFESSIONAL = "professional",
    CLIENT = "client",
    ADMIN = "admin"
}

export interface LoginUserParams {
  email: string
  password: string
}

export interface ResetPasswordProps {
  token: string
  newPassword: string
}
