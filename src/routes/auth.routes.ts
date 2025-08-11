import { Router } from "express"
import { RegisterUserController, VerifyEmailController, LoginController } from "../modules/auth/auth.controller"
import { validate } from "../middlewares/zod-validation"
import { loginSchema, registerSchema } from "../modules/auth/auth.schema"

const router = Router()

router.post("/login",validate(loginSchema, "body"), LoginController)

router.post("/register", validate(registerSchema, "body"), RegisterUserController)

router.get("/verify-account", VerifyEmailController)

export default router
