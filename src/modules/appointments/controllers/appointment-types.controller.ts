import { Request, Response, NextFunction } from 'express';
import AppointmentTypeService from '../../appointments/services/appointment-types.service';


export const getAppointmentTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { page, size } = req.query;
    const professionalId = req.myUser?.userId ;

    const data = await AppointmentTypeService.getAll(professionalId, [], Number(page), Number(size));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req?.myUser?.userId;
    const data = await AppointmentTypeService.getOne({ appointmentTypeId: req.params.id }, undefined, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;

    const data = await AppointmentTypeService.create(req.body, professionalId);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await AppointmentTypeService.update(req.body, { appointmentTypeId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await AppointmentTypeService.delete({ appointmentTypeId: req.params.id }, professionalId, false);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
