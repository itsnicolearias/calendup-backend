import { Request, Response, NextFunction } from 'express';

export interface IBaseService<T> {
  getAll(
    professionalId?: string,
    includeModel?: object,
    page?: number,
    size?: number,
    all?: boolean,
    where?: object,
  ): Promise<GetAllResponse<T>>;

  getOne(
    where: object,
    includeModel?: any,
    professionalId?: string,
  ): Promise<T>;

  create(
    body: Partial<T>,
    professionalId?: string,
  ): Promise<T>;

  update(
    body: Partial<T>,
    where: object,
    professionalId?: string,
  ): Promise<{ message: string; record: any }>;

  delete(
    where: object,
    professionalId?: string,
  ): Promise<{ message: string; record?: any }>;
}



export interface IBaseController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface GetAllResponse<T> {
  count: number,
  rows: T[],
  pagesQuantity: number
}