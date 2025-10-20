import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { config } from '../config/environments';
import { decodeToken } from '../utils/jwt';
import { User } from '../models/user';

export const validateRole = (roles: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const Authorization = req.headers['authorization'];

      if (!Authorization) {
        throw boom.unauthorized('Authorization header is missing');
      }

      const token: string = Authorization.split(' ')[1];
      const user = decodeToken(String(token), String(config.jwtSecret));

      const userData = await User.findOne({
        where: { user_id: user.userId },
      });

      if (!userData) {
        throw boom.unauthorized('User not found');
      }

      if (roles.includes(userData?.role)) return next();

      throw boom.unauthorized('User not authorized');
    } catch (error) {
      next(error);
    }
  };
};