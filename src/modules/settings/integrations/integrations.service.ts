import { IIntegrationsService } from "./integrations.interface";
import boom from '@hapi/boom'
import { Integration } from "../../../models/integrations";
import { oauth2Google } from "../../../libs/google-apis/intex";
import BaseService from "../../base/base.service";
import { User } from "../../../models/user";
import { Plan } from "../../../models/plan";
import { Subscription } from "../../../models/subscription";
import { config } from "../../../config/environments";
import { google } from "googleapis";
import { decrypt, encrypt } from "../../../libs/crypto";
import { buildGoogleDateTime, calculateEndTime } from "../../../utils/convert-date-time";



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

public async handleCalendarCallback(code: string, professionalId: string): Promise<void> {
    try {
        const { tokens } = await oauth2Google.getToken(code)
        oauth2Google.setCredentials(tokens)

        if (!tokens.refresh_token) throw boom.badRequest('Refresh Token not obtained')

        const encryptedAccess = encrypt(tokens.access_token!)
        const encryptedRefresh = encrypt(tokens.refresh_token)

        await Integration.upsert({
            professionalId,
            provider: 'google',
            active: true,
            accessToken: encryptedAccess,
            refreshToken: encryptedRefresh,
        })
    } catch (error) {
        throw boom.badRequest(error);
    }
  
}


/**
 * Devuelve un cliente OAuth2 autorizado para el usuario.
 */
async getAuthorizedClient(userId: string) {
    try {
        const integration = await Integration.findOne({
            where: { userId, provider: 'google' }
        })

        if (!integration) throw boom.notFound('Integration not found')

        const accessToken = decrypt(integration.accessToken!)
        const refreshToken = decrypt(integration.refreshToken!)

        oauth2Google.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken
        })

        return oauth2Google;
    } catch (error) {
        throw boom.badRequest(error);
    }
  
}

/**
 * Crea una reunión de Google Meet y devuelve el link.
 */
public async createGoogleMeetLink(userId: string, clientName: string, date: string, time: string, duration: number) {
    try {
        const client = await this.getAuthorizedClient(userId)
        const calendar = google.calendar({ version: 'v3', auth: client })

        const startTime = buildGoogleDateTime(date, time);
        const endTime = calculateEndTime(date, time, duration)

        const event = {
            summary: `Reunion con ${clientName}`,
            start: { dateTime: startTime },
            end: { dateTime: endTime },
            conferenceData: {
            createRequest: {
                requestId: `meet-${Date.now()}`,
                conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
            }
        }

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1
        })

        return response.data?.hangoutLink
    } catch (error) {
        throw boom.badRequest(error);
    }
  
}

/**
 * Verifica si un usuario premium tiene activada la integración con Google Meet.
 */
public async canAutoCreateMeet(userId: string): Promise<Boolean> {
    try {
        const user = await User.findOne({ where: {userId}, include: [Subscription, Plan, Integration]})

        if (!user) {
            throw boom.notFound("User not found")
        }
        const isPremium = user.Subscription.planId !== config.freePlanId && user.Subscription.plan.features["meetAvailable"]
        if (!isPremium) {
            return false;
        }

        const meetIntegration = user.Integrations.find(i => (i.provider === "google"))
        if (!meetIntegration){
            return false;
        }

        const canAutoCreate = meetIntegration?.autoCreateMeetLinks;

        return isPremium && canAutoCreate
    } catch (error) {
        throw boom.badRequest(error);
    }

}

}

export default new IntegrationService()