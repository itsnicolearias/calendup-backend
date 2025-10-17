import { google } from "googleapis";
import { config } from "../../config/environments";


export const oauth2Google = new google.auth.OAuth2({
   client_id: config.googleClientId, 
   client_secret: config.googleClientSecret, 
   redirectUri: config.calendarCallbackUrl
})