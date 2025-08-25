import { Request, Response, NextFunction } from 'express';
import AppointmentTypeService from './appointment-types.service';
import { JwtPayload } from 'jsonwebtoken';
import { AppointmentType } from '../../models/appointment_type';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { Appointment } from '../../models/appointment';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const getAppointmentTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { page, size } = req.query;
    const professionalId = req['user']?.userId ;

    const data = await AppointmentTypeService.getAll(professionalId, [], Number(page), Number(size));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req?.user?.userId;
    const data = await AppointmentTypeService.getOne({ appointmentTypeId: req.params.id }, undefined, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.user?.userId;

    const data = await AppointmentTypeService.create(req.body, professionalId);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.user?.userId;
    const data = await AppointmentTypeService.update(req.body, { appointmentTypeId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointmentType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.user?.userId;
    const data = await AppointmentTypeService.delete({ appointmentTypeId: req.params.id }, professionalId, false);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
