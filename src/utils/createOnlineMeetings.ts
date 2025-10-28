import { badRequest } from "@hapi/boom";
import integrationsService from "../modules/settings/integrations/integrations.service";
import { Appointment } from "../models/appointment";
import { createAppointmentEvent } from "../libs/google-apis/meet";
import { createZoomMeeting } from "../libs/zoom";
import { User } from "../models/user";

export const handleOnlineMeetings = async (appointment: Appointment, professional: User ): Promise<string | undefined> => {
    try {
        const createMeetLink = await integrationsService.canAutoCreateMeet(appointment.professionalId)
        let link: string;  

        if (createMeetLink.integration) {
                   
            const autoCreateMeet = createMeetLink.create && appointment.selectedAppMode === "online" && createMeetLink.integration.autoCreateMeetLinks;

            if (createMeetLink.integration.provider === "google") {
            
            link = await createAppointmentEvent({ 
            userId: appointment.professionalId, 
            clientName: `${appointment.name} ${appointment.lastName}`, 
            date: appointment.date, 
            time: appointment.time, 
            duration: professional.profile.appointmentDuration!,
            autoCreateMeet,
            })
            
        } else if (createMeetLink.integration.provider === "zoom" && appointment.selectedAppMode === "online" && createMeetLink.create) {

            const res = await createZoomMeeting(appointment.professionalId, `Reunion con ${appointment.name} ${appointment.lastName}`, 
            new Date(`${appointment.date}T${appointment.time}:00` ).toISOString(),
            professional.profile.appointmentDuration!);

            link = res.join_url
            }

            if (appointment.selectedAppMode === "online" && createMeetLink.create){
            appointment.meetingLink = link!;
            await appointment.save()
            }
            
        }
        return link;
    } catch (error) {
        throw badRequest(error);
    }
}