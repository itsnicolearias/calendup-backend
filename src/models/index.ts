import { Model } from "sequelize";
import { User } from "./user";
import { Profile } from "./profile";
import { Appointment } from "./appointment";
import { AppointmentType } from "./appointment_type";

export function Models() {
  const models = [
    User,
    Profile,
    Appointment,
    AppointmentType
  ];

  return models;
}