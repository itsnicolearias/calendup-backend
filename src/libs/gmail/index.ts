import { google } from "googleapis";
import nodemailer from "nodemailer";
import { config } from "../../config/environments";
import Boom from "@hapi/boom";
import Mail from "nodemailer/lib/mailer";
import { EmailOptions } from "../../interfaces/nodemailer";

const oAuth2Client = new google.auth.OAuth2({ 
  client_id: config.gmailApiClientId, 
  client_secret: config.gmailApiClientSecret, 
  redirectUri: config.gmailApiRedirectUri
});

oAuth2Client.setCredentials({ refresh_token: config.gmailApiRefreshToken })

export async function sendEmailGoogle(data: EmailOptions) {
  try {

    // Obtener access token dinámico
    const accessToken = await oAuth2Client.getAccessToken();

    // Transporter de nodemailer usando Gmail API (no SMTP normal)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.emailFrom,
        clientId: config.gmailApiClientId,
        clientSecret: config.gmailApiClientSecret,
        refreshToken: config.gmailApiRefreshToken,
        accessToken: accessToken.token ?? undefined
      }
    });

    const options: Mail.Options = {
        ...data,
        from: config.emailFrom,
      };

    await transporter.sendMail(options);
  } catch (error) {
    throw Boom.badRequest(error);
  }
}
