import { fn, col } from "sequelize";
import { Review } from "../models/review";
import Boom from "@hapi/boom";

export async function getProfessionalRating(professionalId: string): Promise<RatingResponse> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await Review.findAll({
            where: { professionalId },
            attributes: [
            [fn("AVG", col("rating")), "averageRating"],
            [fn("COUNT", col("review_id")), "totalReviews"],
            ],
            raw: true,
  });

        const averageRating = result[0].averageRating
            ? parseFloat(Number(result[0].averageRating).toFixed(1))
            : 0;

        return {
            averageRating,
            totalReviews: Number(result[0].totalReviews),
        };
    } catch (error) {
        throw Boom.badRequest(error);
    }
  
}

export interface RatingResponse {
    averageRating: number;
    totalReviews: number;
}