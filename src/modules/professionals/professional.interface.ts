import { Appointment } from "../../models/appointment";
import { Availability, WeekDay } from "../settings/profile/profile.interface";

export interface IProfessionalService {
    getAvailableSlots(_body: AvailableSlotBody): Promise<AvailableSlotResponse>;
}

export interface AvailableSlot {
  date: string // '2025-08-21'
  time: string // '14:00'
}

export type AvailableSlotResponse  = {
  availableSlots: Record<string, string[]>,
  holidays: { date: string; type: string; name: string }[]
} 

export type AvailableSlotBody = {
  professionalId: string,
  month: number,
  year: number
}

export const dayMap: Record<string, WeekDay> = {
  lunes: 'monday',
  martes: 'tuesday',
  miércoles: 'wednesday',
  jueves: 'thursday',
  viernes: 'friday',
  sábado: 'saturday',
  domingo: 'sunday'
}

export type CheckAvailabilityBody = {
  date: string,
  time: string,
  appointments: Appointment[],
  availability: Availability
}