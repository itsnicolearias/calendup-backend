import { AvailableSlot } from "../modules/professionals/professional.interface"

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