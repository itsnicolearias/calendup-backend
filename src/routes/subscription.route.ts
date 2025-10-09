import { Router } from "express";
import { auth } from "../middlewares/auth";
import { SubscriptionController } from "../modules/subscriptions/subscription.controller";

const router = Router();

// Webhook de Mercado Pago
router.post("/webhooks/mercado-pago", SubscriptionController.handleWebhook);

// Obtener suscripción del usuario autenticado
router.get("/", auth, SubscriptionController.getUserSubscription);

export default router;
