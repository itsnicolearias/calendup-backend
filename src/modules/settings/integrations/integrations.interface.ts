import { oauth2Google } from "../../../libs/google-apis/intex";

export type IntegrationsProviders =  "google"| "zoom"

export interface IIntegrationsService {
    getCalendarAuthUrl(): Promise<string>
    handleCalendarCallback(code: string, professionalId: string): Promise<void>
    canAutoCreateMeet(userId: string): Promise<Boolean>;
    createGoogleMeetLink(userId: string, clientName: string, date: string, time: string, duration: number): Promise<string | null | undefined>;
    getAuthorizedClient(userId: string): Promise<typeof oauth2Google>
}

export interface IntegrationParams {
    professionalId?: string
    provider?: IntegrationsProviders
    accessToken?: string
    refreshToken?: string
    tokenExpiresAt?: string
    active?: boolean
    autoCreateMeetLinks?: boolean
    autoSendMeetLinks?: boolean
    syncAppWithCalendar?: boolean
    showEventsInAgenda?: boolean
}