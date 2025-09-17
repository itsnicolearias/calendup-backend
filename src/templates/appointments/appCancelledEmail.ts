export function appointmentCancelledEmail(name: string, professional: string, date: string, time: string, appointmentUrl: string) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Turno cancelado</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9fafb; color: #111827; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="padding: 20px; text-align: center; background: linear-gradient(to right, #ac043f, #0388bd); color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px;">Calendup</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px;">
          <h2 style="margin-bottom: 15px;">Hola, ${name}</h2>
          <p>Lamentamos informarte que tu turno con <strong>${professional}</strong> fue cancelado.</p>
          <p><strong>Fecha:</strong> ${date}<br/><strong>Hora:</strong> ${time}</p>
           <p style="margin-top:20px;text-align:center;">
            <a href="${appointmentUrl}" style="background:linear-gradient(to right,#ac043f,#0388bd);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;">Ver en agenda</a>
          </p>
          <p style="margin-top: 20px;">Si necesitas, puedes agendar un nuevo turno desde nuestra plataforma.</p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
