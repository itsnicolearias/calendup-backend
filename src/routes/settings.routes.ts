import { Router } from "express"
import {
  getProfile,
  updateProfile,
} from "../modules/settings/profile.controllers"
import { validate } from "../middlewares/zod-validation"
import { updateProfileSchema } from "../modules/settings/profile.schema"
import { auth } from "../middlewares/auth"

const router = Router()

router.get("/profile", auth, getProfile)
router.put("/profile", auth, validate(updateProfileSchema, "body"), updateProfile)

export default router
