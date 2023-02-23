import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import { GetRequest } from './request/get.request';
import { GetValidation } from './validation/get.validation';

export const get = async (req: Request<{}, {}, GetRequest>, res: Response) => {
  let validateData: GetRequest | undefined = undefined;
  try {
    validateData = await GetValidation.validate(req.body);
  } catch (error) {
    const yupError = error as ValidationError;
    console.log();
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: yupError.message,
      },
    });
  }

  // const result: AxiosResponse = await axios.get(
  //     `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
  // );
  return res.status(StatusCodes.OK).json(validateData);
};
