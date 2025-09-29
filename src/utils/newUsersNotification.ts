import  Boom from "@hapi/boom"
import { config } from "../config/environments"
import { sendEmailGoogle } from "../libs/gmail"

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
        await sendEmailGoogle(data)
    } catch (error) {
        throw Boom.badRequest(error)
    }
}