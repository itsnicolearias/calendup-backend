import { User } from "../../models/user";
import BaseService from "../base/base.service";
import { startOfMonth, endOfMonth, addMinutes, isBefore, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { AvailableSlot, AvailableSlotBody, AvailableSlotResponse, dayMap, IProfessionalService } from "./professional.interface";
import { Profile } from "../../models/profile";
import Boom from "@hapi/boom";
import AppointmentService from "../appointments/appointment.service";
import { Op } from "sequelize";
import { WeekDay } from "../settings/profile.interface";
import { groupByDate } from "../../utils/date-agrupator";
import { AppointmentType } from "../../models/appointment_type";

class ProfessionalService extends BaseService<User> implements IProfessionalService {
    constructor() {
        super(User);
      }

async getAvailableSlots(body: AvailableSlotBody): Promise<AvailableSlotResponse> {
    try {
  const { professionalId, month, year } = body
  const startDate = startOfMonth(new Date(year, month - 1))
  const endDate = endOfMonth(startDate)
  const today = new Date()

  const profile = await Profile.findOne({ where: { userId: professionalId } })
  if (!profile) {
    throw Boom.notFound('Error professional not found')
  }
  if (!profile.availability || !profile.appointmentDuration) {
    throw Boom.badRequest('Professional must configure profile')
  }

  const availability = profile.availability // formato { monday: [{start, end}], ... }
  const duration = profile.appointmentDuration

  const whereClause = {
    date: {
       [Op.gt]: startDate.toISOString().split('T')[0], 
       [Op.lt]: endDate.toISOString().split('T')[0]
    },
    status: {
      [Op.ne]: "cancelled"
    }
  }
  const appointmentsResponse = await AppointmentService.getAll(professionalId, undefined, undefined, undefined, true, whereClause)
  const appointments = appointmentsResponse.rows

  // Estructura de turnos agendados para búsqueda rápida
  const bookedSet = new Set(appointments.map((appt) => `${appt.date}-${appt.time}`))

  const availableSlots: AvailableSlot[] = []

  for (
    let day = new Date(startDate);
    day <= endDate;
    day.setDate(day.getDate() + 1)
  ) {
    const dayOfWeekEs = format(day, 'EEEE', { locale: es }).toLowerCase() // lunes, martes, etc.
    const dayOfWeek: WeekDay = dayMap[dayOfWeekEs]
    const slotsForDay = availability[dayOfWeek]

    if (!slotsForDay || slotsForDay.length === 0) continue

    for (const block of slotsForDay) {
      const [startHour, startMinute] = block.start.split(':').map(Number)
      const [endHour, endMinute] = block.end.split(':').map(Number)

      const blockStart = new Date(day)
      blockStart.setHours(startHour, startMinute, 0, 0)

      const blockEnd = new Date(day)
      blockEnd.setHours(endHour, endMinute, 0, 0)

      for (
        let slot = new Date(blockStart);
        slot < blockEnd;
        slot = addMinutes(slot, duration)
      ) {
        if (isBefore(slot, today)) continue

        const dateStr = format(slot, 'yyyy-MM-dd')
        const timeStr = format(slot, 'HH:mm')

        const slotKey = `${dateStr}-${timeStr}`

        if (!bookedSet.has(slotKey)) {
          availableSlots.push({ date: dateStr, time: timeStr })
        }
      }
    }
  }
  const response = groupByDate(availableSlots)
  return response
    } catch (error) {
      throw Boom.badRequest(error);
    }
  
}
public async getAll(professionalId?: string | null, includeModel?: object, page?: number, size?: number, all?: boolean) {
  try {
    const professionals = await super.getAll(null, [Profile], page, size, all)
    return professionals;
  } catch (error) {
    throw Boom.badRequest(error);
  }
}

async getOne(where: Record<string, unknown>, includeModel?: object, professionalId?: string) {
  try {
    const professional = await super.getOne(where, [Profile, AppointmentType])
    return professional;
  } catch (error) {
    throw Boom.badRequest(error);
  }
}

}

export default new ProfessionalService()