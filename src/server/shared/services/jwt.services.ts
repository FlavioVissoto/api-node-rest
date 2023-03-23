import * as jwt from 'jsonwebtoken';

import { JWT, TYPE_JWT_SECRET_NOT_FOUND } from '../../constants';
import { TYPE_JWT_EXPIRES_TIME_FOUND, TYPE_JWT_INVALID_TOKEN } from '../../constants/jwt.constants';

import { LogService } from './log.service';

interface JTWToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

interface JWTData {
  uid: number;
  email: string;
}

const sign = (data: JWTData): JTWToken | TYPE_JWT_SECRET_NOT_FOUND | TYPE_JWT_EXPIRES_TIME_FOUND => {
  if (!process.env.JWT_SECRET) {
    LogService.writeError({
      file: __dirname,
      message: JWT.JWT_SECRET_NOT_FOUND,
      method: sign.name,
      name: 'JWT_SERVICE',
    });
    return JWT.JWT_SECRET_NOT_FOUND;
  }

  if (!process.env.JWT_EXPIRES_TIME) {
    LogService.writeError({
      file: __dirname,
      message: JWT.JWT_EXPIRES_TIME_FOUND,
      method: sign.name,
      name: 'JWT_SERVICE',
    });
    return JWT.JWT_EXPIRES_TIME_FOUND;
  }

  const token = jwt.sign(data, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: Number(process.env.JWT_EXPIRES_TIME),
  });

  return {
    access_token: token,
    expires_in: Number(process.env.JWT_EXPIRES_TIME),
    // refresh_token: undefined,
    // scope: undefined,
    token_type: 'Bearer',
  };
};

const verify = (token: string): JWTData | TYPE_JWT_SECRET_NOT_FOUND | TYPE_JWT_INVALID_TOKEN => {
  if (!process.env.JWT_SECRET) {
    LogService.writeError({
      file: __dirname,
      message: JWT.JWT_SECRET_NOT_FOUND,
      method: sign.name,
      name: 'JWT_SERVICE',
    });
    return JWT.JWT_SECRET_NOT_FOUND;
  }

  try {
    const decoded: jwt.JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded === 'string') {
      return JWT.JWT_INVALID_TOKEN;
    }
    return decoded as JWTData;
  } catch (err) {
    LogService.writeError({
      file: __dirname,
      message: JWT.JWT_INVALID_TOKEN,
      method: verify.name,
      name: 'JWT_SERVICE',
    });
    return JWT.JWT_INVALID_TOKEN;
  }
};

export const JWTServices = {
  sign,
  verify,
};
