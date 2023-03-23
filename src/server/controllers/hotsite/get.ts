import { Request, Response } from 'express';
import { number, object, ObjectSchema } from 'yup';

import { StatusCodes } from 'http-status-codes';
import { HotsiteRequest } from '../../entity/contracts/request/hotsite';
import { validation } from '../../shared/middleware';
import { HotsiteServices } from '../../shared/services/hotsite';

interface QueryProps extends HotsiteRequest {}

const _validation: ObjectSchema<QueryProps> = object().shape({
  qtdMonths: number().required().max(13),
});

export const GetValidation = validation({
  query: _validation,
});

export const Get = async (req: Request<{}, {}, {}, HotsiteRequest>, res: Response) => {
  const result = await HotsiteServices.getHotsite(req.query);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
