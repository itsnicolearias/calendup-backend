import { Review } from "../../../models/review";
import BaseService from "../../base/base.service";

class ReviewService extends BaseService<Review> {
  constructor() {
    super(Review);
  }
}

export default new ReviewService();