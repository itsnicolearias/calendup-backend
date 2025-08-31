import { Model } from "sequelize";
import { User } from "./user";
import { Profile } from "./profile";
import { Appointment } from "./appointment";
import { AppointmentType } from "./appointment_type";
import { Review } from "./review";

export function Models() {
  const models = [
    User,
    Profile,
    Appointment,
    AppointmentType,
    Review
  ];

  return models;
}