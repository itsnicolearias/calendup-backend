import  Boom from "@hapi/boom"
import { FREE_PLAN_ID } from "../modules/subscriptions/interfaces";
import { Plan } from "../models/plan";
import { Subscription } from "../models/subscription";
import { User } from "../models/user";

export const CreateFreeSubscription = async (user: User) => {
    try {
        const freePlan = await Plan.findOne({ where: { planId: FREE_PLAN_ID } });
        
        if (!freePlan) throw Boom.notFound("Free plan not found");

        const subscription = await Subscription.create({
            userId: user.userId,
            planId: freePlan.planId,
            status: "active",
            startDate: new Date(),
        });

        return { subscription, freePlan };

    } catch (error) {
        throw Boom.badRequest(error)
    }
}