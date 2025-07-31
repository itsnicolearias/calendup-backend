import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import boom from '@hapi/boom';
import { config } from '../config/environments';
import { EmailOptions } from '../interfaces/nodemailer';

// options for create a nodemailer tranporter
const transport: SMTPTransport | SMTPTransport.Options | string = {
  //pool: true,
  host: config.smtpHost,
  port: Number(config.smtpPort),
  secure: true,
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
};

export const transporter = nodemailer.createTransport(transport);

export async function sendEmail(
  data: EmailOptions,
): Promise<any> {
  try {
    const options: Mail.Options = {
      ...data,
      from: config.emailFrom,
    };

    await transporter.sendMail(options);
  } catch (error) {
    throw boom.badRequest(error);
  }
}