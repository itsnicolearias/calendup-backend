export function resetPasswordRequestTemplate(link: string) {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(to right, #ac043f, #0388bd); color:#fff; padding:16px; text-align:center; font-size:20px; font-weight:bold;">
        Recuperar contraseña 🔑
      </div>
      <div style="padding:24px; color:#111827;">
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>CalendUp</strong>.</p>
        <p>Si realizaste esta solicitud, haz clic en el botón de abajo para crear una nueva contraseña:</p>
        <div style="text-align:center; margin:24px 0;">
          <a href="${link}" style="background:linear-gradient(to right, #ac043f, #0388bd); color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block;">Restablecer contraseña</a>
        </div>
        <p>Si no solicitaste este cambio, puedes ignorar este correo. Tu cuenta permanecerá segura.</p>
      </div>
      <div style="background:#f1f1f1; padding:16px; text-align:center; font-size:12px; color:#666;">
        CalendUp © 2025 – Simplifica tu gestión de turnos
      </div>
    </div>
  </div>
  `
};
