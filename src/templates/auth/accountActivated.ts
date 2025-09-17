import { config } from "../../config/environments";

export function accountActivatedTemplate() {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(to right, #ac043f, #0388bd); color:#fff; padding:16px; text-align:center; font-size:20px; font-weight:bold;">
        ¡Tu cuenta está lista! 🚀
      </div>
      <div style="padding:24px; color:#111827;">
        <p>¡Felicitaciones! Tu cuenta en <strong>CalendUp</strong> ha sido activada exitosamente.</p>
        <p>Ahora puedes empezar a aprovechar todas nuestras funcionalidades:</p>
        <ul>
          <li>📅 Configura tu disponibilidad y duración de turnos.</li>
          <li>🛠️ Ofrece distintos servicios personalizados.</li>
          <li>✅ Recibe confirmaciones y recordatorios automáticos.</li>
          <li>🔗 Comparte tu enlace único de agendamiento.</li>
          <li>📊 Consulta tu calendario mes a mes desde cualquier dispositivo.</li>
        </ul>
        <div style="text-align:center; margin:24px 0;">
          <a href=${config.urlFront}/auth/login style="background:linear-gradient(to right, #ac043f, #0388bd); color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block;">Ir a CalendUp</a>
        </div>
      </div>
      <div style="background:#f1f1f1; padding:16px; text-align:center; font-size:12px; color:#666;">
        CalendUp © 2025 – Simplifica tu gestión de turnos
      </div>
    </div>
  </div>
  `
};
