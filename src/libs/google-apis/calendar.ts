import { google } from "googleapis";
import { getAuthorizedClient } from ".";
import Boom from "@hapi/boom";

// 1️⃣ Obtener eventos del calendario del usuario
export const getUserCalendarEvents = async (userId: string, timeMin?: string, timeMax?: string) => {
    try {
        const client = await getAuthorizedClient(userId)
        const calendar = google.calendar({ version: "v3", auth: client });

        const res = await calendar.events.list({
            calendarId: "primary",
            timeMin: timeMin || new Date().toISOString(),
            timeMax: timeMax,
            singleEvents: true,
            orderBy: "startTime",
        });

        return res.data.items || [];
    } catch (error) {
        throw Boom.badRequest(error);
    }
};