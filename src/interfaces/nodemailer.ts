import Mail from "nodemailer/lib/mailer";

export type EmailOptions = {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    attachments?: Mail.Attachment[];
  };