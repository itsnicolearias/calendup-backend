import Boom from "@hapi/boom"
import { AvailableSlot } from "../modules/professionals/professional.interface"
import { config } from "../config/environments"

export function groupByDate(slots: AvailableSlot[]): Record<string, string[]> {
  return slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = []
    }
    acc[slot.date].push(slot.time)
    acc[slot.date].sort((a, b) => a.localeCompare(b))
    return acc
  }, {} as Record<string, string[]>)
}

export async function obtainArgHolidays (year: number, month: number) {
  try {
        const holidaysFetch = await fetch(`${config.argHolidaysApi}/${year}`, {
          method: "GET"

      })
        const holidaysRes = await holidaysFetch.json()

        const holidaysRaw = holidaysRes as { fecha: string; tipo: string; nombre: string }[]

        const holidays = holidaysRaw
          .filter(h => new Date(h.fecha).getMonth() + 1 === month)
          .map(h => ({
            date: h.fecha, 
            name: h.nombre, 
            type: h.tipo  
          }))

        return holidays;
  } catch (error) {
    throw Boom.badRequest(error);
  }
}