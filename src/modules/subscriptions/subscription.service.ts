import Boom from "@hapi/boom";
import { Request } from "express";
import { User } from "../../models/user";
import { Plan } from "../../models/plan";
import { Subscription } from "../../models/subscription";
import BaseService from "../base/base.service";
import { config } from "../../config/environments";
import { cancelMpSubscription, getSubscriptionData } from "../../libs/mercado-pago/subscriptions";


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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { preapproval_plan_id, auto_recurring } = subscriptionData as any;

      // TEST THIS IN PROD
      const user = await User.findOne({ where: { email: payer_email}, include: Subscription });
      
      if (user) {

        if (status === "authorized" || status === "active") {

          const plan = await Plan.findOne({ where: { mpPlanId: preapproval_plan_id} });
          const planAnnual = await Plan.findOne({ where: { mpAnnualPlanId: preapproval_plan_id } });

          if (!plan && !planAnnual) throw Boom.notFound("Plan not found");
          
          const planId = plan ? plan.planId : planAnnual?.planId;

          await Subscription.update({
            planId,
            status: "active",
            startDate: auto_recurring.start_date,
            endDate: next_payment_date,
            type: planAnnual ? "annual" : "monthly",
            mpSubscriptionId: subscriptionData.id,
          }, { where: { subscriptionId: user.Subscription.subscriptionId } });
      
      } else if (status === "cancelled" || status === "paused") {

        const freePlan = await Plan.findOne({ where: { planId: config.freePlanId } });

          await Subscription.update(
            {
              planId: freePlan?.planId,
              status: "cancelled",
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
        include: [ Plan, User ],
      });

      if (!subscription) throw Boom.notFound("Subscription not found");

      return subscription;
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }

  async cancelSubscription(userId: string){
    try {
      const sus = await this.getUserSubscription(userId);

      if (!sus.mpSubscriptionId) throw Boom.notFound("Mp Subscription ID not found");

      await cancelMpSubscription(sus.mpSubscriptionId);
    } catch (error) {
      throw Boom.badRequest(error);
    }
  }

};

export default new SubscriptionService();
