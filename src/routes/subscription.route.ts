import { Router } from "express";
import { auth } from "../middlewares/auth";
import { SubscriptionController } from "../modules/subscriptions/subscription.controller";

const router = Router();


router.post("/webhooks/mercado-pago", SubscriptionController.handleWebhook);

router.get("/", auth, SubscriptionController.getUserSubscription);

router.put("/cancel/:id", auth, SubscriptionController.cancelUserSubscription);

export default router;
