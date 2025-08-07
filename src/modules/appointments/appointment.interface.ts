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