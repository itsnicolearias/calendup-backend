import  Boom from "@hapi/boom"
import { Plan } from "../models/plan";
import { Subscription } from "../models/subscription";
import { User } from "../models/user";
import { config } from "../config/environments";

export const CreateFreeSubscription = async (user: User) => {
    try {
        const freePlan = await Plan.findOne({ where: { planId: config.freePlanId } });
        
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