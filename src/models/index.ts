import { Model } from "sequelize";
import { User } from "./user";
import { Profile } from "./profile";
import { Appointment } from "./appointment";

export function Models() {
  const models = [
    User,
    Profile,
    Appointment
  ];

  return models;
}