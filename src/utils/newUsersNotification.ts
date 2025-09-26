import  Boom from "@hapi/boom"
import { sendEmail } from "../libs/nodemailer"
import { config } from "../config/environments"

export const newUsersNotification  = async (name: string, subscription: string, lastname?: string) => {
    try {
        const data = {
            to: config.emailFrom!,
            subject: "Nuevo usuario registrado",
            text: `Hola! has recibido un nuevo usuario en CalendUp
            Nombre: ${name},
            Apellido: ${lastname},
            Tipo de suscripcion: ${subscription}`
                    
        }
        await sendEmail(data)
    } catch (error) {
        throw Boom.badRequest(error)
    }
}