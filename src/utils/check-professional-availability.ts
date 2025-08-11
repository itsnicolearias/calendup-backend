import Boom  from "@hapi/boom";
import { CheckAvailabilityBody } from "../modules/professionals/professional.interface";
import { parse, isWithinInterval, format } from "date-fns"

type Availability = {
  [day: string]: { start: string; end: string }[]
}

/**
 * Verifica si una fecha y hora está dentro de la disponibilidad semanal del profesional.
 * 
 * @param availability - Objeto de disponibilidad por día de la semana.
 * @param dateStr - Fecha en formato YYYY-MM-DD.
 * @param timeStr - Hora en formato HH:mm.
 * @returns true si está disponible, false si no.
 */
export function isDateTimeAvailable(
  availability: Availability,
  dateStr: string,
  timeStr: string
): boolean {
  const date = parse(dateStr, "yyyy-MM-dd", new Date())
  const dayOfWeek = format(date, "EEEE").toLowerCase() // "monday", "tuesday", etc.

  const dayAvailability = availability[dayOfWeek]
  if (!dayAvailability || dayAvailability.length === 0) {
    return false
  }

  // Creamos un objeto Date para la hora deseada
  const timeToCheck = parse(`${dateStr} ${timeStr}`, "yyyy-MM-dd HH:mm", new Date())
  // Verificamos si está dentro de algún rango del día
  return dayAvailability.some(({ start, end }) => {
    const startDate = parse(`${dateStr} ${start}`, "yyyy-MM-dd HH:mm", new Date())
    const endDate = parse(`${dateStr} ${end}`, "yyyy-MM-dd HH:mm", new Date())

    return isWithinInterval(timeToCheck, { start: startDate, end: endDate })
  })
}

export const checkAvailability = (body: CheckAvailabilityBody): void => {
    try {
        const appointments = body.appointments
        const checkApp = appointments.find((app) => 
            (app.date.toString() === body.date ) && (app.time ===  body.time) 
         )

         const isAvailable = isDateTimeAvailable(body.availability, body.date, body.time)

         if (checkApp || !isAvailable) {
            throw Boom.forbidden("Date is not available");
         }
    } catch (error) {
        throw Boom.badRequest(error);
    }

}