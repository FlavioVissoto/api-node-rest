import { Request, Response } from 'express';
import { object, ObjectSchema, string } from 'yup';
import { HTTP, JWT } from '../../constants';

import { StatusCodes } from 'http-status-codes';
import { User } from '../../database/models';
import { UserProvider } from '../../database/providers/user';
import { validation } from '../../shared/middleware';
import { JWTServices } from '../../shared/services';
import { PasswordCryto } from './../../shared/services/password.crypto';

interface BodyProps extends Omit<User, 'id' | 'cd_status' | 'nm_user'> {}

const bodyValidation: ObjectSchema<BodyProps> = object().shape({
  nm_email: string().required().min(5).email(),
  nm_pass: string().required().min(6),
});

export const getAllValidationSignIn = validation({
  body: bodyValidation,
});

export const signIn = async (req: Request<{}, {}, BodyProps>, res: Response) => {
  const { nm_email, nm_pass } = req.body;

  const user = await UserProvider.getByEmail(nm_email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: HTTP.ERROR_EMAIL_PASS_INVALID,
      },
    });
  } else {
    if (await PasswordCryto.verifyPassword(nm_pass, user.nm_pass)) {
      const acessToken = JWTServices.sign({ email: user.nm_email, uid: user.id });

      if (acessToken === JWT.JWT_SECRET_NOT_FOUND || acessToken === JWT.JWT_EXPIRES_TIME_FOUND) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: HTTP.ERROR_GENERATE_TOKEN,
          },
        });
      }

      return res.status(StatusCodes.OK).json(acessToken);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: HTTP.ERROR_EMAIL_PASS_INVALID,
        },
      });
    }
  }
};
