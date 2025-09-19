// templates/auth/verifyAccount.ts
export function verifyAccountTemplate(link: string)  {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(to right, #ac043f, #0388bd); color:#fff; padding:16px; text-align:center; font-size:20px; font-weight:bold;">
        Bienvenido a CalendUp 🎉
      </div>
      <div style="padding:24px; color:#111827;">
        <p>¡Hola! Gracias por registrarte en <strong>CalendUp</strong>.</p>
        <p>Para activar tu cuenta y empezar a gestionar tus turnos, haz clic en el botón de abajo:</p>
        <div style="text-align:center; margin:24px 0;">
          <a href="${link}" style="background:linear-gradient(to right, #ac043f, #0388bd); color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block;">Activar mi cuenta</a>
        </div>
        <p>Con CalendUp podrás:</p>
        <ul>
          <li>📅 Definir y ajustar tus horarios en segundos.</li>
          <li>🛠️ Crear servicios con descripción y precio personalizado.</li>
          <li>✅ Automatizar confirmaciones y recordatorios de turnos.</li>
          <li>🔗 Compartir tu enlace único de agendamiento.</li>
          <li>📊 Visualizar tu agenda completa en cualquier dispositivo.</li>
        </ul>
      </div>
      <div style="background:#f1f1f1; padding:16px; text-align:center; font-size:12px; color:#666;">
        CalendUp © 2025 – Simplifica tu gestión de turnos
      </div>
    </div>
  </div>
  `;
}
