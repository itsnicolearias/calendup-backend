import { Request, Response, NextFunction } from 'express';
import AppointmentService from './../services/appointment.service';
import { JwtPayload } from 'jsonwebtoken';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      myUser?: JwtPayload;
    }
  }
}

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { page, size, all } = req.query;
     const allRecords: boolean = all === 'true';
    const professionalId = req['myUser']?.userId

    const data = await AppointmentService.getAllApp(professionalId, [], Number(page), Number(size), allRecords);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req?.myUser?.userId;
    const data = await AppointmentService.getOne({ appointmentId: req.params.id }, undefined, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await AppointmentService.create(req.body, professionalId);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await AppointmentService.update(req.body, { appointmentId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const professionalId = req.myUser?.userId;
    const data = await AppointmentService.delete({ appointmentId: req.params.id }, professionalId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


export const getAppFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { token } = req.query;

    const data = await AppointmentService.getOneAppointment(String(token))
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const UpdateAppFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { token } = req.query;

    const data = await AppointmentService.updateAppointment(req.body, String(token))
    res.json(data);
  } catch (err) {
    next(err);
  }
};