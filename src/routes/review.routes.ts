import { Router } from 'express';
import * as ReviewController from '../modules/appointments/controllers/reviews.controller';
import { validate } from '../middlewares/zod-validation';
import { auth } from '../middlewares/auth';
import { createReviewSchema, updateReviewSchema } from '../modules/appointments/schemas/review.schema';

const router = Router();
router.get('/', auth, ReviewController.getReviews);
router.get('/:id', auth, ReviewController.getReview);
router.post('/', validate(createReviewSchema, "body"), ReviewController.createReview);
router.put('/:id', auth, validate(updateReviewSchema, "body"), ReviewController.updateReview);
router.delete('/:id', auth, ReviewController.deleteReview);

export default router;
