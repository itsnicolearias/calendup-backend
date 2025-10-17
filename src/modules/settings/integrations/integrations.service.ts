import { IIntegrationsService } from "./integrations.interface";
import boom from '@hapi/boom'
import { Integration } from "../../../models/integrations";
import { oauth2Google } from "../../../libs/google-apis/intex";
import BaseService from "../../base/base.service";



class IntegrationService extends BaseService<Integration>  implements IIntegrationsService {
    constructor() {
        super(Integration);
      }

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

public async  handleCalendarCallback(code: string, professionalId: string): Promise<void> {
    try {
        const { tokens } = await oauth2Google.getToken(code)
        oauth2Google.setCredentials(tokens)

        if (!tokens.refresh_token) throw boom.badRequest('Refresh Token not obtained')

        await Integration.upsert({
            professionalId,
            provider: 'google_calendar',
            active: true,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
        })
    } catch (error) {
        throw boom.badRequest(error)
    }
  
}

}

export default new IntegrationService()