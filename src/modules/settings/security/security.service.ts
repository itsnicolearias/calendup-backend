import Boom from "@hapi/boom";
import { ChangePasswordBody, ISecurityService } from "./security.interface";
import { User } from "../../../models/user";
import { compare, hash } from "bcryptjs"
import { passwordChangedTemplate } from "../../../templates/auth/passwordChanged";
import { sendEmailGoogle } from "../../../libs/gmail";

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
    
}

  export default new SecurityService();