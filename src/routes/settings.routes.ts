import { Router } from "express"
import {
  getProfile,
  updateProfile,
} from "../modules/settings/profile/profile.controllers"
import { validate } from "../middlewares/zod-validation"
import { updateProfileSchema } from "../modules/settings/profile/profile.schema"
import { auth } from "../middlewares/auth"
import { changePasswordSchema } from "../modules/settings/security/security.schema"
import { changePassword } from "../modules/settings/security/security.controller"
import IntegrationsRouter from "./integrations.route"

const router = Router()

router.get("/profile", auth, getProfile)
router.put("/profile", auth, validate(updateProfileSchema, "body"), updateProfile)

router.post("/change-password", auth, validate(changePasswordSchema, "body"), changePassword)

router.use('/integrations', IntegrationsRouter)

export default router
