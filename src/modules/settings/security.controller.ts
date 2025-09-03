import { NextFunction, Request, Response } from "express";
import securityService from "./security.service";

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.myUser?.userId;
    await securityService.changePassword(req.body, userId)
    res.status(200).send()
  } catch (error) {
    next(error)
  }
}