export function appointmentCancelledProfessionalEmail(professionalName: string, patientName: string, appointmentUrl: string) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Turno cancelado</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9fafb; color: #111827; padding: 20px;">
    <table width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:20px;text-align:center;background:linear-gradient(to right,#ac043f,#0388bd);color:#fff;">
          <h1 style="margin:0;font-size:22px;">Calendup</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px;">
          <h2>Hola, ${professionalName}</h2>
          <p>El turno con <strong>${patientName}</strong> ha sido cancelado.</p>
          <p style="margin-top:20px;text-align:center;">
            <a href="${appointmentUrl}" style="background:linear-gradient(to right,#ac043f,#0388bd);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;">Ver en agenda</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
