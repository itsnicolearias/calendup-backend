import { NextFunction, Request, Response } from "express";
import ProfessionalService from "./professional.service";

export const getAvailableDates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.params.id;
    
    const month = parseInt(req.query.month as string);
    const year = parseInt(req.query.year as string);

    const data = await ProfessionalService.getAvailableSlots({professionalId, month, year});
    res.json(data);
  } catch (error) {
    next(error);
  }
};
