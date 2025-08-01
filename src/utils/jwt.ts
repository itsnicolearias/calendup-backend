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

export const decodeToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret) as { userId: string }
        return decoded;
    } catch (error) {
        throw boom.badRequest("Error verifying token", error)
    }
  
}

export const generateLoginToken = (payload: { userId: string, role: string }) => {
    try {
        return jwt.sign(payload, String(SECRET), { expiresIn: "7d" })
    } catch (error) {
        throw boom.badRequest("Error generating login token", error)
    }
}