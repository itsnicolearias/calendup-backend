import { Request, Response, NextFunction } from 'express';

export interface IBaseService {
  getAll(
    professionalId?: string,
    includeModel?: object,
    page?: number,
    size?: number,
    all?: boolean,
    where?: object,
  ): Promise<any>;

  getOne(
    where: object,
    includeModel?: any,
    professionalId?: string,
  ): Promise<any>;

  create(
    body: object,
    professionalId?: string,
  ): Promise<any>;

  update(
    body: object,
    where: object,
    professionalId?: string,
  ): Promise<any>;

  delete(
    where: object,
    professionalId?: string,
  ): Promise<any>;
}



export interface IBaseController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}