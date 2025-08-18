import { NextFunction, Request, Response } from "express"
import * as AuthService from "./auth.service"
import { config } from "../../config/environments"

export const RegisterUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.RegisterService(req.body)

    return res.status(201).json({
      message: "User registered successfully. Please check your email.",
      user: result.user,
      token: result.token, // Opcional: podés ocultarlo si ya lo enviás por mail
    })
  } catch (error) {
    next(error);
  }
}

export const LoginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const result = await AuthService.LoginService({ email, password })
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const VerifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query
    if (typeof token !== "string") {
      return res.status(400).json({ message: "Token is required" })
    }
    await AuthService.VerifyEmailService({ token })
    return res.redirect(`${config.urlFront}/auth/activate-account`)
  } catch (error) {
    next(error)
  }
}
