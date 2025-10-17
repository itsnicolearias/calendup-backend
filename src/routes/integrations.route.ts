import { Router } from "express"
import { handleCalendarCallback, startCalendarAuth } from "../modules/settings/integrations/integrations.controller"
import { checkFeatureAccess } from "../middlewares/checkFeatureAccess"
import { auth } from "../middlewares/auth"

const router = Router()

router.get('/calendar/auth', auth, checkFeatureAccess, startCalendarAuth)
router.get('/calendar/callback', auth, handleCalendarCallback)

export default router
