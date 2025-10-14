import { MercadoPagoConfig, Payment} from "mercadopago";
import { config } from "../../config/environments";
import Boom from "@hapi/boom";

export const client = new MercadoPagoConfig({
	accessToken: config.mpAccessToken!,
	options: { timeout: 5000 },
});

const payment = new Payment(client);

export const getPaymentData = async (paymentId: string) => {
    try {
        const p = await payment.get({ id: paymentId })

        return p;
    } catch (error) {
        throw Boom.badRequest(error.message);
    }
}