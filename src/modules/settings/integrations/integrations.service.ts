import { IIntegrationsService } from "./integrations.interface";
import boom from '@hapi/boom'
import { Integration } from "../../../models/integrations";
import { oauth2Google } from "../../../libs/google-apis";
import BaseService from "../../base/base.service";
import { User } from "../../../models/user";
import { Plan } from "../../../models/plan";
import { Subscription } from "../../../models/subscription";
import { config } from "../../../config/environments";
import { encrypt } from "../../../libs/crypto";
import axios from "axios";
import { decodeToken, generateGenericToken } from "../../../utils/jwt";

class IntegrationService extends BaseService<Integration>  implements IIntegrationsService {
    constructor() {
        super(Integration);
      }

public async getCalendarAuthUrl(userId: string): Promise<string> {
    try {
        const scopes = [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
        ]

        const stateToken = generateGenericToken({userId}, config.jwtSecret)
        const link = oauth2Google.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: scopes,
            state: stateToken
        })
        return link;
    } catch (error) {
        throw boom.badRequest(error)
    } 
}

public async handleCalendarCallback(code: string, state: string): Promise<void> {
    try {
        const { userId } = decodeToken(state, config.jwtSecret);

        const { tokens } = await oauth2Google.getToken(code)
        oauth2Google.setCredentials(tokens)

        if (!tokens.refresh_token) throw boom.badRequest('Refresh Token not obtained')

        const encryptedAccess = encrypt(tokens.access_token!)
        const encryptedRefresh = encrypt(tokens.refresh_token)

        await Integration.upsert({
            professionalId: userId,
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
 * Verifica si un usuario premium tiene activada la opcion de auto crear links de reunion.
 */
public async canAutoCreateMeet(userId: string): Promise<{create: boolean, integration?: Integration}> {
    try {
        const user = await User.findOne({ where: {userId}, include: [{model: Subscription, include: [Plan] }, Integration]})

        if (!user) {
            throw boom.notFound("User not found")
        }
        const isPremium = user.Subscription.planId !== config.freePlanId && user.Subscription.plan.features["meetAvailable"] || user.Subscription.plan.features["zoomAvailable"]
        if (!isPremium) {
            return { create: false };
        }

        const findIntegration = user.Integrations.find(i => (i.provider === "google" || i.provider === "zoom"))
        if (!findIntegration){
            return { create: false }
        }

        const canAutoCreate = findIntegration?.autoCreateMeetLinks;

        return  {create: canAutoCreate, integration: findIntegration}
    } catch (error) {
        throw boom.badRequest(error);
    }
}

 public async getZoomAuthUrl(userId: string): Promise<string> {
    try {
      const stateToken = generateGenericToken({userId}, config.jwtSecret)
      const redirectUri = config.zoomRedirectUrl;

      const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${config.zoomClientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&state=${stateToken}`;

      return authUrl;
    } catch (error) {
      throw boom.badRequest("Error generating Zoom auth URL", error);
    }
  }

  public async handleZoomCallback(code: string, state: string): Promise<void> {
    try {
      const { userId } = decodeToken(state, config.jwtSecret);

      const tokenUrl = "https://zoom.us/oauth/token";
      const redirectUri = config.zoomRedirectUrl;

      const authHeader = Buffer.from(
        `${config.zoomClientId}:${config.zoomClientSecret}`
      ).toString("base64");

      const response = await axios.post(
        tokenUrl,
        null,
        {
          params: {
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
          },
          headers: {
            Authorization: `Basic ${authHeader}`,
          },
        }
      );

      const { access_token, refresh_token } = response.data;
      if (!refresh_token) throw boom.badRequest("Refresh Token not obtained");

      const encryptedAccess = encrypt(access_token);
      const encryptedRefresh = encrypt(refresh_token);

      await Integration.upsert({
        professionalId: userId,
        provider: "zoom",
        active: true,
        accessToken: encryptedAccess,
        refreshToken: encryptedRefresh,
      });
    } catch (error) {
      throw boom.badRequest("Error handling Zoom callback", error);
    }
  }

  

}

export default new IntegrationService()