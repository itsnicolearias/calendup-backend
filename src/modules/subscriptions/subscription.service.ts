import Boom from "@hapi/boom";
import { Request } from "express";
import { User } from "../../models/user";
import { Plan } from "../../models/plan";
import { Subscription } from "../../models/subscription";
import BaseService from "../base/base.service";

class SubscriptionService extends BaseService<Subscription> {
    constructor() {
        super(Subscription);
      }

  /**
   * Update User subscription
   */
  async updateSubscription(data: {
    status: string;
    payer_email: string;
    plan_id: string;
  }) {
    try {
      const { status, payer_email, plan_id } = data;

      const user = await User.findOne({ where: { email: payer_email } });
      if (!user) throw Boom.notFound("User not found");

      const plan = await Plan.findByPk(plan_id);
      if (!plan) throw Boom.notFound("Plan not found");

      const [subscription] = await Subscription.update({
        planId: plan.planId,
        status,
      }, { where: { subscriptionId: user.Subscription.subscriptionId } });

      return subscription;
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }

  /**
   * Process Mercado Pago Webhook
   */
  async handleWebhook(req: Request) {
    try {
      const { type, data } = req.body;

      /*if (type !== "preapproval") {
        return { message: "Evento ignorado" };
      }*/
     console.log(type)
     console.log(data)

      const subscriptionData = {
        status: data.status,
        payer_email: data.payer_email,
        plan_id: data.external_reference, // este valor lo envías al crear el plan
      };

      await this.updateSubscription(subscriptionData);
      return { message: "Suscripción actualizada correctamente" };
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }

  /**
   * Returns users actual subscription
   */
  async getUserSubscription(userId: string) {
    try {
      const subscription = await Subscription.findOne({
        where: { userId },
        include: [{ model: Plan }],
      });

      if (!subscription) throw Boom.notFound("Subscription not found");

      return subscription;
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }
};

export default new SubscriptionService();
