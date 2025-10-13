// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment, PreApproval } from "mercadopago";
import { config } from "../../config/environments";
import  Boom from "@hapi/boom";

// Step 2: Initialize the client object
export const client = new MercadoPagoConfig({
	accessToken: config.mpAccessToken!,
	options: { timeout: 5000 },
});

const preApproval = new PreApproval(client);

const payment = new Payment(client);


export const getSubscriptionData = async (subscriptionId: string) => {
    try {
        const subscription = await preApproval.get({ id: subscriptionId })

        return subscription
    } catch (error) {
        throw Boom.badRequest(error.message);
    }
}

export const searchSubscription = async (email: string) => {
    try {
        const subscription = await preApproval.search({ options: { payer_email: email }  })

        return subscription
    } catch (error) {
        throw Boom.badRequest(error);
    }
}

export const getPaymentData = async (paymentId: string) => {
    try {
        const p = await payment.get({ id: paymentId })

        return p;
    } catch (error) {
        throw Boom.badRequest(error.message);
    }
}