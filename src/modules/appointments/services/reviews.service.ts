import Boom from "@hapi/boom";
import { Review } from "../../../models/review";
import BaseService from "../../base/base.service";
import { ReviewCreate } from "../interfaces/review.interface";
import { config } from "../../../config/environments";
import { decodeToken } from "../../../utils/jwt";

class ReviewService extends BaseService<Review> {
  constructor() {
    super(Review);
  }

  async createReview(body: ReviewCreate, token: string): Promise<Review> {
    try {
      const verifyToken = decodeToken(token, config.jwtUserSecret!)

      const appointmentId = verifyToken.appointmentId

      body.appointmentId = appointmentId

      return await this.create(body)
    } catch (error) {
      throw Boom.badRequest(error);
    }  
  }
}

export default new ReviewService();