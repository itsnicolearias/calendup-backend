// templates/auth/passwordChanged.ts
export function passwordChangedTemplate() {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(to right, #ac043f, #0388bd); color:#fff; padding:16px; text-align:center; font-size:20px; font-weight:bold;">
        Seguridad actualizada 🔒
      </div>
      <div style="padding:24px; color:#111827;">
        <p>Hola,</p>
        <p>Queremos informarte que tu contraseña en <strong>CalendUp</strong> ha sido modificada exitosamente.</p>
        <p>Si realizaste este cambio, no es necesario que hagas nada más. En caso contrario, por favor contacta a nuestro equipo de soporte de inmediato.</p>
        <p>Tu seguridad es nuestra prioridad. Protegemos tus datos y los de tus clientes con los más altos estándares.</p>
      </div>
      <div style="background:#f1f1f1; padding:16px; text-align:center; font-size:12px; color:#666;">
        CalendUp © 2025 – Simplifica tu gestión de turnos
      </div>
    </div>
  </div>
  `;
};
