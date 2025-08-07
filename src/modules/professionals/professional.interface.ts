import { WeekDay } from "../settings/profile.interface";

export interface IProfessionalService {
    getAvailableSlots(body: AvailableSlotBody): Promise<AvailableSlot[]>;
}

export interface AvailableSlot {
  date: string // '2025-08-21'
  time: string // '14:00'
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