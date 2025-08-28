import cron from "node-cron";
import { autoCompleteAppointments } from "../modules/appointments/services/appointment.service";


cron.schedule("0 0 * * *", async () => {
  console.log(`[${new Date().toISOString()}] Ejecutando job de turnos completados...`);
  try {
    await autoCompleteAppointments();
  } catch (err) {
    console.error("Error al marcar turnos completados:", err);
  }
});
