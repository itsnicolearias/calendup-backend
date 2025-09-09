import { String } from "aws-sdk/clients/cloudwatchevents";
import { User } from "../../models/user"
import { UserRole } from "../auth/auth.interface"
export interface IProfileService{
  getOneProfile(userId: string): Promise<User>;
  updateProfile(body: UserWithProfile, userId: String): Promise<User>
}

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
    profilePicture: string
    appointmentDuration: number
    createdAt: Date
    updatedAt: Date
    availability: Availability
    markAppAsCompleted: boolean
    country: string
    province: string
    city: string
    profileCompleted: boolean
    education: Education[]
    languages: string[]
    profileProgress: number
  }
  googleId: string
  facebookId: string
}

export type Education = {
  title: string
  institution: string
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
  start: string // "09:00"
  end: string   // "13:00"
}

export type Availability = {
  [key in WeekDay]: TimeSlot[]
}

export type InsuranceProviders = [ InsuranceProvidersBody]

export interface InsuranceProvidersBody {
    name: string
    plan: string
    notes: string
}

/* Ejemplo
{
    "name": "OSDE",
    "plan": "210",
    "notes": "Requires referral letter"
  }
*/

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