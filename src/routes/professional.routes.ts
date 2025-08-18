import { Router } from "express"
import { getAvailableDates, getOneProfessional, getProfessionals } from "../modules/professionals/professional.controller";


const router = Router()

router.get("/:id/available-dates", getAvailableDates)

router.get("/", getProfessionals)
router.get("/:id", getOneProfessional)

export default router;