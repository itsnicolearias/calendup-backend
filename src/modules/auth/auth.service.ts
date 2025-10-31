/* eslint-disable @typescript-eslint/no-explicit-any */
import { compare, hash } from "bcryptjs"
import { User } from "../../models/user"
import { LoginUserParams, RegisterUserParams, ResetPasswordProps, UserRole, VerifyEmailParams } from "./auth.interface"
import { decodeToken, generateLoginToken, generateVerificationToken } from "../../utils/jwt"
import  Boom from "@hapi/boom"
import { Profile } from "../../models/profile"
import { config } from "../../config/environments"
import { verifyAccountTemplate } from "../../templates/auth/verifyAccount"
import { accountActivatedTemplate } from "../../templates/auth/accountActivated"
import { CreateFreeSubscription } from "../../utils/createFreeSubscription"
import { newUsersNotification } from "../../utils/newUsersNotification"
import jwt from "jsonwebtoken"
import { resetPasswordRequestTemplate } from "../../templates/auth/forgetPassword"
import {resetPasswordSuccessTemplate}  from "../../templates/auth/resetPassword"
import { sendEmailGoogle } from "../../libs/google-apis/gmail"

export const RegisterService = async ( body: RegisterUserParams) => {
    try {
        const existingUser = await User.findOne({ where: { email: body.email } })

        if (existingUser) throw Boom.forbidden("Email is already registered")

        const hashedPassword = await hash(body.password, 10)

        const user: User = await User.create({
            email: body.email,
            password: hashedPassword,
            verified: false,
            role: UserRole.PROFESSIONAL,
        })

        const profile = await Profile.create({
            userId: user.userId,
            name: body.firstName,
            lastName: body.lastName,
        })

        const sub = await CreateFreeSubscription(user);

        const token = generateVerificationToken(user.userId)
        const  link = `${config.url}/auth/verify-account?token=${token}`;

        await sendEmailGoogle({ 
            to: user.email, 
            subject: 'Verifica tu cuenta 📅', 
            html: verifyAccountTemplate(link) })

        await newUsersNotification(profile.name!, sub.freePlan.name, profile.lastName)

    } catch (error) {
        throw Boom.badRequest(error);
    }
  
}

export const LoginService = async (body: LoginUserParams) => {
  try {
    const user = await User.scope("withPassword").findOne({ 
        where: { email: body.email }, 
        include: [Profile] 
    })

    if (!user) throw Boom.unauthorized("User does not exist")

    const passwordMatch = await compare(body.password, user.password)

    if (!passwordMatch) throw Boom.unauthorized("Invalid email or password")

    if (!user.verified) throw Boom.unauthorized("You must verify your email before logging in")

    const token = generateLoginToken({ userId: user.userId, role: user.role, lastName: user.profile.lastName })

    return { token }
  } catch (error) {
    throw Boom.badRequest(error)
  }
}

export const VerifyEmailService = async ({ token }: VerifyEmailParams) => {
    try {
        const payload = decodeToken(token, String(config.jwtSecret))

        const user = await User.findByPk(payload.userId)
        if (!user) throw Boom.notFound("User not found")

        if (user.verified) throw Boom.badRequest("Already verified")
       
        user.verified = true
        await user.save()

        await sendEmailGoogle({
            to: user.email, 
            subject: 'Tu cuenta ha sido activada exitosamente 📅', 
            html: accountActivatedTemplate()
        })

        return { message: "User verified successfully" }
    } catch (error) {
        throw Boom.badRequest(error);
        
    }
}

export const GoogleService = async (user: any) => {
    try {
        const token = generateLoginToken({ userId: user.userId!, role: user.role!, lastName: user.profile?.lastName ?? '' })
      return token;
    } catch (error) {
        throw Boom.badRequest(error)
    }
}

export const FacebookService = async (user: any) => {
    try {
        const token = generateLoginToken({ userId: user.userId!, role: user.role!, lastName: user.profile?.lastName ?? "" })

      return token;
    } catch (error) {
        throw Boom.badRequest(error)
    }
}

export const ForgotPassword = async (email: string) => {
    try {
        const user = await User.findOne({ where:  {email} })

        if (!user){
             throw Boom.notFound("User not found")
        }

        const token = jwt.sign({userId: user.userId}, config.jwtRecoverySecret!, { expiresIn: "1h"})

        await user.update({ resetToken: token})

        const link =  `${config.urlFront}/auth/reset-password?reset-token=${token}`

        await sendEmailGoogle({
            to: user.email,
            subject: "Recupera tu contraseña en CalendUp",
            html: resetPasswordRequestTemplate(link)
        })
    } catch (error) {
        throw Boom.badRequest(error)
    }
}

export const ResetPassword = async (body: ResetPasswordProps) => {
    try {
       const payload =  decodeToken(body. token, config.jwtRecoverySecret!)
    
       const user = await User.scope("withPassword").findByPk(payload.userId)
       if (!user) throw Boom.notFound("User not found")

       if (user.resetToken !== body.token){
            throw Boom.forbidden("Tokens does not match")
       }

        user.password = await hash(body.newPassword, 10)
       
        await user.save()

        await sendEmailGoogle({ 
        to: user.email, 
        subject: 'Tu contraseña ha sido restablecida', 
        html: resetPasswordSuccessTemplate()
    })

    } catch (error) {
        throw Boom.badRequest(error)
    }
}

