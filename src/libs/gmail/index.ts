import { google } from "googleapis";
import { config } from "../../config/environments";
import Boom from "@hapi/boom";

const oAuth2Client = new google.auth.OAuth2({ 
  client_id: config.gmailApiClientId, 
  client_secret: config.gmailApiClientSecret, 
  redirectUri: config.gmailApiRedirectUri
});

oAuth2Client.setCredentials({ refresh_token: config.gmailApiRefreshToken })

export async function sendEmailGoogle({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  try {
    // Construcción MIME (soporta texto y/o HTML)
    const headers = [
      `From: Calendup <${config.emailFrom}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      `Content-Type: ${html ? "text/html; charset=utf-8" : "text/plain; charset=utf-8"}`,
    ];

    const body = html ?? text ?? "";

    const rawMessage = [...headers, "", body].join("\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

  } catch (error) {
    throw Boom.badRequest(error);
  }
}
