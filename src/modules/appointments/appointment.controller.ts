import { Request, Response, NextFunction } from 'express';
import AppointmentService from './appointment.service';
import { JwtPayload } from 'jsonwebtoken';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { page, size } = req.query;
    const professionalId = req['user']?.userId ;

    const data = await AppointmentService.getAll(professionalId, [], Number(page), Number(size));
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req?.user?.userId;
    const data = await AppointmentService.getOne({ appointmentId: req.params.id }, undefined, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.user?.userId;
    const data = await AppointmentService.create(req.body, professionalId);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.user?.userId;
    const data = await AppointmentService.update(req.body, { appointmentId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.user?.userId;
    const data = await AppointmentService.delete({ appointmentId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
