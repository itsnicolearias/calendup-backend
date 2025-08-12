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

export const getProfessionals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, size, all } = req.query;
    const allRecords: boolean = all === 'true';

    const data = await ProfessionalService.getAll(null, [], Number(page), Number(size), allRecords)
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getOneProfessional = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.params.id;

    const data = await ProfessionalService.getOne({userId: professionalId});
    res.json(data);
  } catch (error) {
    next(error);
  }
};
