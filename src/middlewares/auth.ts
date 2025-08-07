import { Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import moment from 'moment';
import 'dotenv/config';
import { config } from '../config/environments';
import { decodeToken } from '../utils/jwt';


export const auth = async (req: any, res: Response, next: NextFunction) => {
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
        req.user = payload;

        next();
    } catch (e) {
      next(boom.unauthorized(e));
    }
};