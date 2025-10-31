import { NextFunction, Request, Response } from "express";
import securityService from "./security.service";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      myUser?: JwtPayload;
    }
  }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.myUser?.userId;
    await securityService.changePassword(req.body, userId)
    res.status(200).json("Updated Successfully")
  } catch (error) {
    next(error)
  }
}

export const sendSupportMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await securityService.sendSupportEmail(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};