import { z } from "zod";

export const IntegrationUpdateSchema = z.object({
  active: z.boolean().optional(),
  autoCreateMeetLinks: z.boolean().optional(),
  syncAppWithCalendar: z.boolean().optional(),
  showEventsInAgenda: z.boolean().optional(),
});