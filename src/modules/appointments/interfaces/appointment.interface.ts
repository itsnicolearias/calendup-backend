import { Appointment } from "../../../models/appointment";

export interface CreateAppointmentParams {
  professionalId: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  reason?: string;
  status: AppointmentStatus;
  appointmentCode: string;
}

export interface AppointmentsResponse {
  rows: Appointment[];
  count: number;
  pagesQuantity: number;
}

export const  AppointmentStatusConst = ["pending",  "confirmed", "cancelled", "completed"] as const;

export type  AppointmentStatus =  "pending" | "confirmed" | "cancelled" | "completed"

export const AppointmentType = ["in_person", "online"] as const ;

export interface IAppointmentService{
  getOneAppointment(token: string): Promise<{ appointment: Appointment, rating: any }>;
  updateAppointment(body: Partial<CreateAppointmentParams>, token: string): Promise<Appointment>
}