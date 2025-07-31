import { Router } from "express"
import { RegisterUserController, VerifyEmailController, LoginController } from "../modules/auth/auth.controller"

const router = Router()

router.post("/login", LoginController)

router.post("/register", RegisterUserController)

router.get("/verify", VerifyEmailController)

export default router
