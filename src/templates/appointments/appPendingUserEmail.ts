export function appointmentPendingUserEmail(userName: string, professional: string, date: string, time: string, appointmentUrl: string) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Turno pendiente</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9fafb; color: #111827; padding: 20px;">
    <table width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:20px;text-align:center;background:#0388bd;color:#fff;">
          <h1 style="margin:0;font-size:22px;">Calendup</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px;">
          <h2>Hola, ${userName}</h2>
          <p>Tu turno fue registrado y está pendiente de confirmación por el profesional:</p>
          <p><strong>Profesional:</strong> ${professional}<br/><strong>Fecha:</strong> ${date}<br/><strong>Hora:</strong> ${time}</p>
          <p style="margin-top:20px;text-align:center;">
            <a href="${appointmentUrl}" style="background:#0388bd;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;">Ver estado del turno</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
