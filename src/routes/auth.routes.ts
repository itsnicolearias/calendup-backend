import { Router } from "express"
import { RegisterUserController, VerifyEmailController, LoginController, CallbackGoogle } from "../modules/auth/auth.controller"
import { validate } from "../middlewares/zod-validation"
import { loginSchema, registerSchema } from "../modules/auth/auth.schema"
import passport from "passport"
import "../libs/passport/google.strategy"
import "../libs/passport/facebook.strategy"


const router = Router()

router.post("/login",validate(loginSchema, "body"), LoginController)

router.post("/register", validate(registerSchema, "body"), RegisterUserController)

router.get("/verify-account", VerifyEmailController)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login" }),  CallbackGoogle)

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback", passport.authenticate("facebook", { session: false, failureRedirect: "/login" }),  CallbackGoogle)

export default router
