import { Request, Response } from 'express';
import { object, ObjectSchema, string } from 'yup';

import { StatusCodes } from 'http-status-codes';
import { User } from '../../database/models';
import { UserProvider } from '../../database/providers/user';
import { validation } from '../../shared/middleware';

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

  const result = await UserProvider.getByEmail(nm_email);

  if (result instanceof Error || (result && result.nm_pass != nm_pass)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    });
  } else {
    res.status(StatusCodes.OK).json({
      accessToken: 'token',
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
