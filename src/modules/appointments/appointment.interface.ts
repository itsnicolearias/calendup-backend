import { Appointment } from "../../models/appointment";

export interface CreateAppointmentParams {
  professionalId: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date: Date;
  time: Date;
  reason?: string;
}

export interface AppointmentsResponse {
  rows: Appointment[];
  count: number;
  pagesQuantity: number;
}