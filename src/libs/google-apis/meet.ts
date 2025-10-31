import { google } from "googleapis";
import { buildGoogleDateTime, calculateEndTime } from "../../utils/convert-date-time";
import  Boom from "@hapi/boom";
import { getAuthorizedClient } from ".";

export interface CreateEvent {
    userId: string;
    autoCreateMeet: boolean; 
    clientName: string;
    date: string; 
    time: string; 
    duration: number;
}

export  async function createAppointmentEvent(body: CreateEvent) {
    try {
        const client = await getAuthorizedClient(body.userId)
        const calendar = google.calendar({ version: 'v3', auth: client })

        const startTime = buildGoogleDateTime(body.date, body.time);
        const endTime = calculateEndTime(body.date, body.time, body.duration)

        const event = {
            summary: `Reunion con ${body.clientName}`,
            start: { dateTime: startTime },
            end: { dateTime: endTime },
            conferenceData: {}
            }
            

        // Generar link de Google Meet si el usuario lo desea
        if (body.autoCreateMeet) {
            event.conferenceData = {
            createRequest: { 
                requestId: `meet-${Date.now()}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' } 
            },
            };
        }

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1
        })

        return response.data?.hangoutLink
    } catch (error) {
        throw Boom.badRequest(error);
    }
  
}