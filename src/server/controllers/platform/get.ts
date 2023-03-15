import { Request, Response } from 'express';
import { object, ObjectSchema, string } from 'yup';

import { StatusCodes } from 'http-status-codes';
import { Platform } from '../../database/models';
import { PlatformRequest } from '../../entity/contracts/request/platform';
import { validation } from '../../shared/middleware';
import { PlatformServices } from '../../shared/services/platform';

interface BodyProps extends Omit<Platform, 'id'> {}

const _validation: ObjectSchema<BodyProps> = object().shape({
  //id: number().required(),
  nm_platform: string().required(),
});

export const GetValidation = validation({
  query: _validation,
});

export const Get = async (req: Request<{}, {}, {}, PlatformRequest>, res: Response) => {
  const result = await PlatformServices.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
