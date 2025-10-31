import { Router } from "express"
import { deleteIntegration, getIntegration, getIntegrations, handleCalendarCallback, handleZoomCallback, startCalendarAuth, startZoomAuth, updateIntegration } from "../modules/settings/integrations/integrations.controller"
import { checkFeatureAccess } from "../middlewares/checkFeatureAccess"
import { auth } from "../middlewares/auth"
import { IntegrationUpdateSchema } from "../modules/settings/integrations/integrations.schema"
import { validate } from "../middlewares/zod-validation"

const router = Router()

router.get('/calendar/auth', auth, checkFeatureAccess("calendarAvailable"), startCalendarAuth)
router.get('/calendar/callback', handleCalendarCallback)

router.get('/zoom/auth', auth, checkFeatureAccess("zoomAvailable"), startZoomAuth)
router.get('/zoom/callback', handleZoomCallback)

router.get('/', auth, getIntegrations);
router.get('/:id', auth, getIntegration);

router.put('/:id', auth, validate(IntegrationUpdateSchema, "body"), updateIntegration);
router.delete('/:id', auth, deleteIntegration);

export default router
