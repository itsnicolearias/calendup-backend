import jwt from "jsonwebtoken"
import { config } from "../config/environments"
import  boom  from "@hapi/boom";

const SECRET = config.jwtSecret;

export const generateVerificationToken = (userId: string) => {
    try {
        return jwt.sign({userId: userId}, String(SECRET), { expiresIn: "1d" })
    } catch (error) {
        throw boom.badRequest("Error generating verification token", error)
    }
  
}

export const generateGenericToken = (data: object, secret: string) => {
    try {
        return jwt.sign(data, secret)
    } catch (error) {
        throw boom.badRequest("Error generating token", error)
    }
  
}

export const generateAppModificationToken = (data: object, secret: string, appointmentDate: string) => {
    try {
        const date = new Date(`${appointmentDate}T23:59:59Z`); 

        const expiresInSeconds = Math.floor(date.getTime() / 1000) + 24 * 60 * 60;

        const expiration = expiresInSeconds - Math.floor(Date.now() / 1000);

        return jwt.sign(data, secret, { expiresIn: expiration })
    } catch (error) {
        throw boom.badRequest("Error generating token", error)
    }
  
}

export const decodeToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret)

        if (typeof decoded === 'string') {
            throw boom.unauthorized("Invalid token")
        }
        return decoded;
    } catch (error) {
        throw boom.badRequest("Error verifying token", error)
    }
  
}

export const generateLoginToken = (payload: { userId: string, role: string, lastName: string }) => {
    try {
        return jwt.sign(payload, String(SECRET), { expiresIn: "7d" })
    } catch (error) {
        throw boom.badRequest("Error generating login token", error)
    }
}

export interface JwtPayload extends jwt.JwtPayload {
    userId?: string,
    email?: string,
    role?: string,
}