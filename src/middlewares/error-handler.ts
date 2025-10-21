/* eslint-disable @typescript-eslint/no-explicit-any */
import Boom from '@hapi/boom';
import { NextFunction, Response, Request } from 'express';

export function errorHandler(req: Request, res: Response, error: any) {
  const err = Boom.internal(error);
  const { output } = err;
  res.status(output.statusCode).json(output.payload);
}

export function boomErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // TODO: when an external log service is being used delete
  // eslint-disable-next-line no-console
  console.log('FOUND ERROR', error);
  if (!error.isBoom) {
    next(error);
  }
  const { output } = error;

  res.status(output?.statusCode || 500).json(output?.payload);
}