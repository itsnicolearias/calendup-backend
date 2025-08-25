import { Appointment } from "../../models/appointment";

export interface CreateAppointmentParams {
  professionalId: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  reason?: string;
  status: AppointmentStatus
}

export interface AppointmentsResponse {
  rows: Appointment[];
  count: number;
  pagesQuantity: number;
}

export const  AppointmentStatusConst = ["pending",  "confirmed", "cancelled"] as const;

export type  AppointmentStatus =  "pending" | "confirmed" | "cancelled"

export const AppointmentType = ["in_person", "online"] as const ;

export interface IAppointmentService{
  getOneAppointment(token: string): Promise<Appointment>;
  updateAppointment(body: Partial<CreateAppointmentParams>, token: string): Promise<Appointment>
}