import jwt from "jsonwebtoken"
import { config } from "../config/environments"
import  boom  from "@hapi/boom";

const SECRET = config.jwtSecret;

export const generateVerificationToken = (payload: { userId: string }) => {
    try {
        return jwt.sign(payload, String(SECRET), { expiresIn: "1d" })
    } catch (error) {
        throw boom.badRequest("Error generating verification token")
    }
  
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, String(SECRET)) as { userId: string }
    } catch (error) {
        throw boom.badRequest("Error verifying token")
    }
  
}

export const generateLoginToken = (payload: { userId: string, role: string }) => {
    try {
        return jwt.sign(payload, String(SECRET), { expiresIn: "1h" })
    } catch (error) {
        throw boom.badRequest("Error generating login token")
    }
}