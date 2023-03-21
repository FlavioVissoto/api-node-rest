import { Request, Response } from 'express';
import { number, object, ObjectSchema, string } from 'yup';

import { StatusCodes } from 'http-status-codes';
import { User } from '../../database/models';
import { UserProvider } from '../../database/providers/user';
import { validation } from '../../shared/middleware';

interface BodyProps extends Omit<User, 'id'> {}

const bodyValidation: ObjectSchema<BodyProps> = object().shape({
  cd_status: number().required(),
  nm_user: string().required().min(5),
  nm_email: string().required().min(5).email(),
  nm_pass: string().required().min(6),
});

export const getAllValidationSignUp = validation({
  body: bodyValidation,
});

export const signUp = async (req: Request<{}, {}, BodyProps>, res: Response) => {
  const result = await UserProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
