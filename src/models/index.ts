import { User } from "./user";
import { Profile } from "./profile";
import { Appointment } from "./appointment";
import { AppointmentType } from "./appointment_type";
import { Review } from "./review";
import { Plan } from "./plan";
import { Subscription } from "./subscription";
import { Integration } from "./integrations";

export function Models() {
  const models = [
    User,
    Profile,
    Appointment,
    AppointmentType,
    Review,
    Plan,
    Subscription,
    Integration
  ];

  return models;
}