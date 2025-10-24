import Boom from "@hapi/boom";
import axios from "axios";
import { Integration } from "../../models/integrations";
import { decrypt } from "../crypto";

export async function createZoomMeeting(
    professionalId: string,
    topic: string,
    startTime: string,
    durationMinutes = 30
  ): Promise<{ join_url: string; start_url: string }> {
    try {
      const integration = await Integration.findOne({
        where: { professionalId, provider: "zoom", active: true },
      });

      if (!integration) throw Boom.badRequest("Zoom integration not found");

      const accessToken = decrypt(integration.accessToken);
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
      console.error("Error creating Zoom meeting:", error.response?.data || error);
      throw Boom.badRequest("Error creating Zoom meeting");
    }
  }