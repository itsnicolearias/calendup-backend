import { Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { config } from '../config/environments';

export const auth = async (req: any, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization) {
        const Authorization: string = req.headers.authorization;
        const token: string = Authorization.split(' ')[1];

        const payload = jwt.verify(token, String(config.jwtSecret)) as { userId: string, role: string, exp?: number };

        if (!payload.exp) {
          throw boom.unauthorized('Invalid token');
        }

        if (payload.exp <= moment().unix()) {
          throw boom.unauthorized('Token has been expired');
        }
        req.user = payload;
      }

      next();
    } catch (e) {
      next(boom.unauthorized(e));
    }
};