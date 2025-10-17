export type IntegrationsProviders =  "google_calendar" | "google_meet" | "zoom"

export interface IIntegrationsService {
    getCalendarAuthUrl(): Promise<string>
    handleCalendarCallback(code: string, userId: string): Promise<void>
}