export function appointmentPendingProfessionalEmail(professionalName: string, patientName: string, date: string, time: string, appointmentUrl: string) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Nuevo turno pendiente</title>
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
          <p>Un paciente ha solicitado un turno, pendiente de tu confirmación:</p>
          <p><strong>Paciente:</strong> ${patientName}<br/><strong>Fecha:</strong> ${date}<br/><strong>Hora:</strong> ${time}</p>
          <p style="margin-top:20px;text-align:center;">
            <a href="${appointmentUrl}" style="background:linear-gradient(to right,#ac043f,#0388bd);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;">Gestionar turno</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
