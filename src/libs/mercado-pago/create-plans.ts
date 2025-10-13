import Boom from "@hapi/boom";
import { Plan } from "../../models/plan";
import { config } from "../../config/environments";
import { PreApprovalPlan } from "mercadopago";
import { client } from ".";
import { PreApprovalRequest } from "mercadopago/dist/clients/preApproval/commonTypes";


const MPPlan = new PreApprovalPlan(client)

/**
 * Sincroniza los planes locales con Mercado Pago.
 * Crea los planes en MP si no tienen mpPlanId.
 */
export const InitSubscriptionPlan = async () => {
  try {
    const plans = await Plan.findAll();

    if (!plans.length) {
      console.log("⚠️ No se encontraron planes en la base de datos.");
      return;
    }

    for (const plan of plans) {

      if (plan.planId === config.freePlanId) {
        continue; // Saltar el plan gratuito
      }

      if (plan.mpPlanId) {
        console.log(`✅ Plan "${plan.name}" ya tiene ID: ${plan.mpPlanId}`);
        continue;
      }

      console.log(`🛠️ Creando plan "${plan.name}" en Mercado Pago...`);
      
      const body = { 
        reason: plan.name,
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: plan.price,
          currency_id: "ARS",
        },
        back_url: config.mpReturnUrl,
        status: "active"
      }

      const mpPlan = await MPPlan.create({ body} );

      plan.mpPlanId = mpPlan.id!;
      await plan.save();

      console.log(`✅ Plan "${plan.name}" creado en MP con ID: ${mpPlan.id! }`);

      if (plan.annualPrice && plan.annualPrice > 0 && !plan.mpAnnualPlanId) {
         console.log(`🛠️ Creando plan "${plan.name}" en Mercado Pago...`);
      
      const body: PreApprovalRequest = { 
        reason: plan.name,
        auto_recurring: {
          frequency: 12,
          frequency_type: "months",
          transaction_amount: plan.annualPrice,
          currency_id: "ARS",
        },
        back_url: config.mpReturnUrl,
        status: "active"
      }

      const mpPlan = await MPPlan.create({ body} );

      plan.mpAnnualPlanId = mpPlan.id!;
      await plan.save();

      console.log(`✅ Plan "${plan.name}" creado en MP con ID: ${mpPlan.id!}`);
      }
    }

  } catch (error: any) {
    console.error("❌ Error al inicializar planes:",  error);
  }
};
