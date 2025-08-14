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
  status: "pending" |  "confirmed" | "cancelled";
}

export interface AppointmentsResponse {
  rows: Appointment[];
  count: number;
  pagesQuantity: number;
}

export const  AppointmentStatus = ["pending",  "confirmed", "cancelled"] as const;

export const AppointmentType = ["in_person", "online"] as const ;

export interface IAppointmentService{
  getOneAppointment(token: string): Promise<Appointment>;
  updateAppointment(body: Partial<CreateAppointmentParams>, token: string): Promise<Appointment>
}