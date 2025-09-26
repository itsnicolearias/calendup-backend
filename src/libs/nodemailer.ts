import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import boom from "@hapi/boom";
import { config } from "../config/environments";
import { EmailOptions } from "../interfaces/nodemailer";

// Transport con timeouts y TLS
const transport: SMTPTransport.Options = {
  host: config.smtpHost,
  port: Number(config.smtpPort),
  secure: false, // STARTTLS
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
  requireTLS: true,
  connectionTimeout: 30_000, // 30s
  greetingTimeout: 10_000,   // 10s
  socketTimeout: 30_000      // 30s
};

export const transporter = nodemailer.createTransport(transport);

// Función con retry automático
export async function sendEmail(
  data: EmailOptions,
  maxRetries = 3,
  delayMs = 2000
): Promise<void> {
  const options: Mail.Options = {
    ...data,
    from: config.emailFrom,
  };

  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await transporter.sendMail(options);
      console.log(`✅ Email enviado en intento #${attempt + 1}`);
      return;
    } catch (error) {
      attempt++;
      console.error(`❌ Error enviando email (intento ${attempt}):`, error);

      if (attempt >= maxRetries) {
        console.error("🚨 Falló después de reintentos. No se pudo enviar el email.");
        throw boom.badRequest(error);
      }

      // Espera antes de reintentar (backoff exponencial)
      const wait = delayMs * attempt;
      console.log(`⏳ Reintentando en ${wait / 1000} segundos...`);
      await new Promise((res) => setTimeout(res, wait));
    }
  }
}
