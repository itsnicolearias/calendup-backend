import Boom from "@hapi/boom";
import { Request } from "express";
import { User } from "../../models/user";
import { Plan } from "../../models/plan";
import { Subscription } from "../../models/subscription";
import BaseService from "../base/base.service";
import { getSubscriptionData } from "../../libs/mercado-pago";
import { config } from "../../config/environments";


class SubscriptionService extends BaseService<Subscription> {
    constructor() {
        super(Subscription);
      }

  /**
   * Update User subscription
   */
  async updateSubscription(subscriptionId: string) {
    try {
      const subscriptionData = await getSubscriptionData(subscriptionId)
      const { status, payer_email, next_payment_date  } = subscriptionData;

      const { preapproval_plan_id, auto_recurring } = subscriptionData as any;

      // TEST THIS IN PROD
      const user = await User.findOne({ where: { email: "test_user_2369776882369531791@testuser.com"}, include: Subscription });
      
      if (user) {

        if (status === "authorized" || status === "active") {

          const plan = await Plan.findOne({ where: { mpPlanId: preapproval_plan_id} });
          const planAnnual = await Plan.findOne({ where: { mpAnnualPlanId: preapproval_plan_id } });

          if (!plan && !planAnnual) throw Boom.notFound("Plan not found");

          await Subscription.update({
            planId: plan ? plan.planId : planAnnual?.planId,
            status: "active",
            startDate: auto_recurring.start_date,
            endDate: next_payment_date,
            type: planAnnual ? "annual" : "monthly",
          }, { where: { subscriptionId: user.Subscription.subscriptionId } });
      
      } else if (status === "cancelled" || status === "paused") {

        const freePlan = await Plan.findOne({ where: { planId: config.freePlanId } });

          await Subscription.update(
            {
              planId: freePlan?.planId,
              status: "active"
            },
            { where: { subscriptionId: user.Subscription.subscriptionId } }
          );
        }

        }    
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }

  /**
   * Process Mercado Pago Webhook
   */
  async handleWebhook(req: Request) {
    try {
      const { type, data, action } = req.body;

     if (type === "subscription_preapproval" && action === "updated") {
      await this.updateSubscription(data.id);

      return { message: "Suscripción actualizada correctamente" };
     }
      
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
