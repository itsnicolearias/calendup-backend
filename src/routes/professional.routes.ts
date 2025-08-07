import { Router } from "express"
import { getAvailableDates } from "../modules/professionals/professional.controller";


const router = Router()

router.get("/:id/available-dates", getAvailableDates)

export default router;