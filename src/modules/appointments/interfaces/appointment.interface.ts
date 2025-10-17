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
  selectedAppMode?: AppointmentMode;
  appointmentCode: string;
  meetingLink: string
}

export interface AppointmentsResponse {
  rows: Appointment[];
  count: number;
  pagesQuantity: number;
}

export const  AppointmentStatusConst = ["pending",  "confirmed", "cancelled", "completed", "cancelledByUser"] as const;

export type  AppointmentStatus =  "pending" | "confirmed" | "cancelled" | "completed" | "cancelledByUser"

export const AppointmentModeConst = ["in_person", "online", "combined"] as const ;

export type AppointmentMode = "in_person" | "online" | "combined" ;

export interface IAppointmentService{
  getOneAppointment(token: string): Promise<{ appointment: Appointment, rating: any }>;
  updateAppointment(body: Partial<CreateAppointmentParams>, token: string): Promise<Appointment>
  getAllApp(professionalId?: string | null, includeModel?: object, page?: number, size?: number, all?: boolean, where?: Record<string, unknown>): Promise<GetAllAppResponse>;
}

export interface GetAllAppResponse {
    appointments: {
      count: number;
      pagesQuantity: number;
      rows: Appointment[]
    },
    createdThisMonth: number;
    
}