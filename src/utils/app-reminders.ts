/* eslint-disable no-console */
import cron from "node-cron";
import { Appointment } from "../models/appointment";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { appointmentReminderEmail } from "../templates/appointments/appReminderEmail";
import { sendEmailGoogle } from "../libs/gmail";

// Función para unir date + time (strings) en un objeto Date
function parseAppointmentDateTime(date: string, time: string): Date {
  // asumiendo que date viene en formato YYYY-MM-DD y time en HH:mm
  return new Date(`${date}T${time}:00`);
}

// Corre cada hora en el minuto 0
cron.schedule("0 * * * *", async () => {
  console.log("[ReminderJob] Ejecutando búsqueda de recordatorios...");

  const now = new Date();
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  try {
    const appointments = await Appointment.findAll({
      where: {
        status: "confirmed",
      },
      include: [{model: User, include: [Profile]}],
    });

    for (const appointment of appointments) {
      const appointmentDateTime = parseAppointmentDateTime(
        appointment.date,
        appointment.time
      );

      // chequear si cae dentro del rango de 24h ± 1h
      if (
        appointmentDateTime >= in24Hours &&
        appointmentDateTime < new Date(in24Hours.getTime() + 60 * 60 * 1000)
      ) {
        const professional = appointment.professional.profile;
        if (!appointment?.email) continue;

        await sendEmailGoogle({
          to: appointment.email,
          subject: "Recordatorio de tu turno 📅",
          html: appointmentReminderEmail(
            appointment.name!,
            `${professional.name} ${professional.lastName}`,
            appointment.date,
            appointment.time
          ),
        });
      }
    }
  } catch (error) {
    console.error("[ReminderJob] Error:", error);
  }
});
