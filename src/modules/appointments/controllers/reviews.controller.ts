import { Request, Response, NextFunction } from 'express';
import ReviewsService from '../services/reviews.service';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      myUser?: JwtPayload;
    }
  }
}

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { page, size, all } = req.query;
     const allRecords: boolean = all === 'true';
     const professionalId = req.myUser?.userId ;

    const data = await ReviewsService.getAll(professionalId, [], Number(page), Number(size), allRecords);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req?.myUser?.userId;
    const data = await ReviewsService.getOne({ reviewId: req.params.id }, undefined, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { token } = req.query;

    const data = await ReviewsService.createReview(req.body, String(token));
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await ReviewsService.update(req.body, { appointmentTypeId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await ReviewsService.delete({ reviewId: req.params.id }, professionalId, false);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
