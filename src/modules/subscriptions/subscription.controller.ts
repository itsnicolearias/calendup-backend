import { Request, Response, NextFunction } from "express";
import  SubscriptionService from "./subscription.service";

export const SubscriptionController = {
  /**
   * Webhook de Mercado Pago
   */
  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("Webhook recibido:", req.body); // Log the incoming request body
      const result = await SubscriptionService.handleWebhook(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Obtiene la suscripción actual del usuario
   */
  async getUserSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.myUser?.userId;
      const subscription = await SubscriptionService.getUserSubscription(userId);
      res.status(200).json(subscription);
    } catch (error) {
      next(error);
    }
  },
};
