import Boom from "@hapi/boom";
import { ChangePasswordBody, ISecurityService } from "./security.interface";
import { User } from "../../../models/user";
import { compare, hash } from "bcryptjs"
import { passwordChangedTemplate } from "../../../templates/auth/passwordChanged";
import { sendEmailGoogle } from "../../../libs/google-apis/gmail";
import { SupportMessageInput } from "./security.schema";
import { sendEmail } from "../../../libs/nodemailer";
import { config } from "../../../config/environments";

class SecurityService implements ISecurityService {
    
    async changePassword(body: ChangePasswordBody, userId: string): Promise<void> {
        try {
            const user = await User.scope("withPassword").findOne({ where: { userId: userId}})

            if (!user) {
                throw Boom.notFound("User not found")
            }

            if (!user.password){
                throw Boom.unauthorized("User no has password")
            }
            
            const passwordMatch = await compare(body.password, user.password)

            if (!passwordMatch) {
                throw Boom.unauthorized("Invalid password")
            }

            user.password = await hash(body.newPassword, 10)

            await user.save()

            await sendEmailGoogle({ 
            to: user.email, 
            subject: 'Se ha modificado su contraseña - CalendUp', 
            html: passwordChangedTemplate()
        })
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

    async sendSupportEmail(data: SupportMessageInput) {
    try {
        const { name, email, message } = data;
        await sendEmail({
            to: config.emailFrom,
            subject: `Consulta de ${name}`,
            text: `De: ${name} <${email}>\n\n${message}`,

        })

        await sendEmail({
            to: email,
            subject: "Hemos recibido tu mensaje",
            text: `Hola ${name},\n\nGracias por contactarte con CalendUp. Nuestro equipo te responderá a la brevedad.\n\nSaludos,\nEquipo de Soporte CalendUp.`,
        });

        return { success: true };
    } catch (error) {
      throw Boom.badRequest("Error sending support email", error);
    }
  }
    
}

  export default new SecurityService();