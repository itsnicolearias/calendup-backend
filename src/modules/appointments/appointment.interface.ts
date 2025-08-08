import { Appointment } from "../../models/appointment";

export interface CreateAppointmentParams {
  professionalId: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date: string;
  time: string;
  reason?: string;
}

export interface AppointmentsResponse {
  rows: Appointment[];
  count: number;
  pagesQuantity: number;
}