export type IntegrationsProviders =  "google_calendar" | "google_meet" | "zoom"

export interface IIntegrationsService {
    getCalendarAuthUrl(): Promise<string>
    handleCalendarCallback(code: string, professionalId: string): Promise<void>
}

export interface IntegrationParams {
    professionalId?: string
    provider?: IntegrationsProviders
    accessToken?: string
    refreshToken?: string
    tokenExpiresAt?: string
    active?: boolean
    autoCreateMeetLinks?: boolean
    syncAppWithCalendar?: boolean
    showEventsInAgenda?: boolean
}