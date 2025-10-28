import Boom from "@hapi/boom";
import axios from "axios";
import { Integration } from "../../models/integrations";
import { decrypt, encrypt } from "../crypto";
import { config } from "../../config/environments";

export async function createZoomMeeting(
    professionalId: string,
    topic: string,
    startTime: string,
    durationMinutes = 30
  ): Promise<{ join_url: string; start_url: string }> {
    try {
      const accessToken = await getAccessToken(professionalId);
      const url = "https://api.zoom.us/v2/users/me/meetings";

      const payload = {
        topic,
        type: 2, // scheduled meeting
        start_time: startTime, // must be RFC3339 UTC
        duration: durationMinutes,
        timezone: "America/Argentina/Buenos_Aires",
        settings: {
          join_before_host: false,
          waiting_room: true,
        },
      };

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return {
        join_url: response.data.join_url,
        start_url: response.data.start_url,
      };
    } catch (error) {
      throw Boom.badRequest("Error creating Zoom meeting", error);
    }
  }

export async function refreshAccessToken(refreshToken: string) {
    const clientId = config.zoomClientId;
    const clientSecret = config.zoomClientSecret;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    try {
      const response = await axios.post(
        "https://zoom.us/oauth/token",
        null,
        {
          params: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw Boom.badRequest("Failed to refresh Zoom token", error);
    }
}

const baseUrl = "https://api.zoom.us/v2";

 export  async function getAccessToken(professionalId: string): Promise<string> {
    const integration = await Integration.findOne({
      where: { professionalId, provider: "zoom", active: true },
    });

    if (!integration) throw Boom.notFound("Zoom integration not found");

    let accessToken = decrypt(integration.accessToken);
    const refreshToken = decrypt(integration.refreshToken);

    try {
      await axios.get(`${baseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 401) {
        const newTokens = await refreshAccessToken(refreshToken);

        integration.accessToken = encrypt(newTokens.access_token);
        if (newTokens.refresh_token)
          integration.refreshToken = encrypt(newTokens.refresh_token);

        await integration.save();

        accessToken = newTokens.access_token;
      } else {
        throw Boom.badRequest("Error validating Zoom token");
      }
    }

    return accessToken;
  }
