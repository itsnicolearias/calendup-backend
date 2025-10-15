import boom from '@hapi/boom';
import { PlanFeatures } from '../modules/subscriptions/interfaces';
import { NextFunction, Request, Response } from 'express';
import subscriptionService from '../modules/subscriptions/subscription.service';

export const checkFeatureAccess = (feature: keyof PlanFeatures) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req.myUser?.userId;
    const subscription = await subscriptionService.getUserSubscription(userId);
    
    const hasFeature = subscription.plan.features[feature];
    if (!hasFeature) {
      return next(boom.forbidden('Access not allowed for this feature'));
    }

    next();
  };
};
