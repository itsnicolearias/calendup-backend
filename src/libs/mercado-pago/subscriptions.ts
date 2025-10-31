import Boom from "@hapi/boom";
import { client } from ".";
import { PreApproval } from "mercadopago";
import { PreApprovalSearchOptions } from "mercadopago/dist/clients/preApproval/search/types";

const preApproval = new PreApproval(client);

export const getSubscriptionData = async (subscriptionId: string) => {
    try {
        const subscription = await preApproval.get({ id: subscriptionId })

        if (!subscription){
          throw Boom.notFound("Subscription not found");
        }

        return subscription
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

export const searchSubscription = async (options: PreApprovalSearchOptions) => {
    try {
        const subscription = await preApproval.search({ options  })

        return subscription
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

/**
 * Cancela una suscripción en Mercado Pago
 * @param subscriptionId ID de la suscripción (preapproval_id)
 */
export const cancelMpSubscription = async (subscriptionId: string) => {
  try {
    const cancelled = await preApproval.update({
      id: subscriptionId,
      body: { status: "cancelled" },
    });

    return cancelled;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw Boom.badRequest(error.message);
  }
};