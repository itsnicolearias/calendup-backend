import { google } from "googleapis";
import { config } from "../../config/environments";
import { Integration } from "../../models/integrations";
import { decrypt } from "../crypto";
import Boom from "@hapi/boom";

export const oauth2Google = new google.auth.OAuth2({
   client_id: config.googleClientId, 
   client_secret: config.googleClientSecret, 
   redirectUri: config.calendarCallbackUrl
})

/**
 * Devuelve un cliente OAuth2 autorizado para el usuario.
 */
export async function getAuthorizedClient(userId: string) {
    try {
        const integration = await Integration.findOne({
            where: { professionalId: userId, provider: 'google' }
        })

        if (!integration) throw Boom.notFound('Integration not found')

        const accessToken = decrypt(integration.accessToken!)
        const refreshToken = decrypt(integration.refreshToken!)

        oauth2Google.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken
        })

        return oauth2Google;
    } catch (error) {
        throw Boom.badRequest(error);
    }
  
}