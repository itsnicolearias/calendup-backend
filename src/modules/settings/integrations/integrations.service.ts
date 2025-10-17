import { IIntegrationsService } from "./integrations.interface";
import boom from '@hapi/boom'
import { Integration } from "../../../models/integrations";
import { oauth2Google } from "../../../libs/google-apis/intex";



class IntegrationService implements IIntegrationsService {

public async getCalendarAuthUrl(): Promise<string> {
    try {
        const scopes = [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
        ]

        const link = oauth2Google.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: scopes,
        })
        return link;
    } catch (error) {
        throw boom.badRequest(error)
    }


  
}

public async  handleCalendarCallback(code: string, userId: string): Promise<void> {
    try {
        const { tokens } = await oauth2Google.getToken(code)
        oauth2Google.setCredentials(tokens)

        if (!tokens.refresh_token) throw boom.badRequest('Refresh Token not obtained')

        await Integration.upsert({
            userId,
            provider: 'google_calendar',
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
        })
    } catch (error) {
        throw boom.badRequest(error)
    }
  
}

}

export default new IntegrationService()