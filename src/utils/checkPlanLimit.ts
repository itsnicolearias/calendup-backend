import { Op } from "sequelize";
import { startOfMonth, endOfMonth } from "date-fns";
import boom from "@hapi/boom";
import { Subscription } from "../models/subscription";
import { Plan } from "../models/plan";
import { Appointment } from "../models/appointment";

export async function checkPlanLimit(userId: string) {
    try {
        // Buscar la suscripción activa
        const subscription = await Subscription.findOne({
            where: { userId, status: "active" },
            include: [{ model: Plan }],
        });

        if (!subscription || !subscription.plan) {
            throw boom.notFound("Subscription not found or inactive");
        }

        // Verificar si el plan tiene features con límite de turnos
        const features = subscription.plan.features as any;
        const maxAppointments = features?.maxAppointmentsPerMonth;

        if (maxAppointments) {
            const now = new Date();

            // Contar turnos creados este mes por el usuario
            const count = await Appointment.count({
                where: {
                professionalId: userId,
                createdAt: {
                    [Op.between]: [startOfMonth(now), endOfMonth(now)],
                },
                },
            });

            if (count >= maxAppointments) {
                throw boom.forbidden(`Appointment limit excedeed`);
            }
        }

    } catch (error) {
         throw boom.badRequest(error)
    }
  
}
