import { UserRole } from "../auth/auth.interface"

export interface UserWithProfile {
  userId: string
  email: string
  password: string
  role: UserRole
  verified?: boolean
  resetToken?: string
  resetTokenExpires?: Date
  createdAt: Date
  updatedAt: Date
  profile?: {
    profileId: string
    userId: string
    name: string
    lastName: string
    address: string
    phone: string
    jobTitle: string
    bio: string
    appointmentDuration: number
    createdAt: Date
    updatedAt: Date
    availability: Availability
  }
}

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export interface TimeSlot {
  from: string // "09:00"
  to: string   // "13:00"
}

export type Availability = {
  [key in WeekDay]: TimeSlot[]
}


/*
ejemplo de valor
{
  "monday": [
    { "start": "09:00", "end": "12:00" },
    { "start": "14:00", "end": "18:00" }
  ],
  "tuesday": [
    { "start": "10:00", "end": "13:00" }
  ]
}

 */