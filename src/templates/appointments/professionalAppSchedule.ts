// src/utils/emails/appointments/confirmedProfessionalEmail.ts

import { config } from "../../config/environments";

export function confirmedProfessionalEmail(
  body: { date: string; time: string; name: string; lastName: string },
  appointment: { appointmentId: string }
): string {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>CalendUp - Nuevo turno agendado</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center" style="padding:20px 0;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
              
              <!-- Header -->
              <tr>
                <td align="center" style="background: #0388bd; padding:20px; color:#ffffff; font-size:20px; font-weight:bold;">
                  📅 CalendUp
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding:30px; color:#111827; font-size:16px; line-height:1.5;">
                  <h2 style="margin-top:0; color:#0388bd; padding:10px; border-radius:5px;">Nuevo turno agendado</h2>
                  <p>Se ha agendado un nuevo turno en tu cuenta:</p>
                  <ul style="padding-left:20px;">
                    <li><strong>Fecha:</strong> ${body.date}</li>
                    <li><strong>Hora:</strong> ${body.time}</li>
                    <li><strong>Paciente:</strong> ${body.name} ${body.lastName}</li>
                  </ul>
                  <p style="margin:30px 0; text-align:center;">
                    <a href="${config.urlFront}/dashboard/appointments/${appointment.appointmentId}" 
                       style="background: #0388bd; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:5px; display:inline-block;">
                      Ver detalles
                    </a>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="background-color:#f0f0f0; padding:15px; font-size:12px; color:#777777;">
                  © 2025 CalendUp - Todos los derechos reservados.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
