import { Response, NextFunction, Request } from 'express';
import boom from '@hapi/boom';
import moment from 'moment';
import 'dotenv/config';
import { config } from '../config/environments';
import { decodeToken } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      myUser?: JwtPayload;
    }
  }
}


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        throw boom.unauthorized('Authorization header is missing');
      }
      const Authorization: string = req.headers.authorization;
      const token: string = Authorization.split(' ')[1];

        const payload = decodeToken(token, String(config.jwtSecret));

        if (!payload.exp) {
          throw boom.unauthorized('Invalid token');
        }

        if (payload.exp <= moment().unix()) {
          throw boom.unauthorized('Token has been expired');
        }
        req.myUser = payload;

        next();
    } catch (e) {
      next(boom.unauthorized(e));
    }
};