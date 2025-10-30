/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export interface IBaseService<T> {
  getAll(
    _professionalId?: string,
    _includeModel?: object,
    _page?: number,
    _size?: number,
    _all?: boolean,
    _where?: object,
  ): Promise<GetAllResponse<T>>;

  getOne(
    _where: object,
    _includeModel?: any,
    _professionalId?: string,
  ): Promise<T>;

  create(
    _body: Partial<T>,
    _professionalId?: string,
  ): Promise<T>;

  update(
    _body: Partial<T>,
    _where: object,
    _professionalId?: string,
  ): Promise<T>;

  delete(
    _where: object,
    _professionalId?: string,
  ): Promise<{ message: string; record?: any }>;
}



export interface IBaseController {
  getAll(_req: Request, _res: Response, _next: NextFunction): Promise<void>;
  getOne(_req: Request, _res: Response, _next: NextFunction): Promise<void>;
  create(_req: Request, _res: Response, _next: NextFunction): Promise<void>;
  update(_req: Request, _res: Response, _next: NextFunction): Promise<void>;
  delete(_req: Request, _res: Response, _next: NextFunction): Promise<void>;
}

export interface GetAllResponse<T> {
  count: number,
  rows: T[],
  pagesQuantity: number
}