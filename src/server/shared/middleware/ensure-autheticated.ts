import { AUTHORIZATION, HTTP } from '../../constants';

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTServices } from './../services/jwt.services';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: AUTHORIZATION.UNAUTHORIZED,
      },
    });
  } else {
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: AUTHORIZATION.UNAUTHORIZED,
        },
      });
    }

    const jwtData = JWTServices.verify(token);

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: HTTP.ERROR_JWT_ERROR_VERIFY_TOKEN,
        },
      });
    } else if (jwtData === 'JWT_INVALID_TOKEN') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: HTTP.ERROR_JWT_ERROR_INVALID_TOKEN,
        },
      });
    }
  }

  return next();
};
