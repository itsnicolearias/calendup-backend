import { Integration } from "../../../models/integrations";

export type IntegrationsProviders =  "google"| "zoom"

export interface IIntegrationsService {
    getCalendarAuthUrl(_userId: string): Promise<string>
    handleCalendarCallback(_code: string, _professionalId: string): Promise<void>
    canAutoCreateMeet(_userId: string): Promise<{create: boolean, integration?: Integration}>;
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