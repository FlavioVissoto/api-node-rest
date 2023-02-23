import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import { GetAllRequest } from './request/get-all.request';
import { GetAllValidation } from './validation/get-all.validation';

export const getAll = async (req: Request<{}, {}, GetAllRequest>, res: Response) => {
  let validateData: GetAllRequest | undefined = undefined;
  try {
    validateData = await GetAllValidation.validate(req.query, { abortEarly: false });
  } catch (error) {
    const yupError = error as ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach((x: ValidationError) => {
      if (!x.path) {
        return;
      }
      validationErrors[x.path] = x.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
  }

  const result: AxiosResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: validateData,
  });

  return res.status(StatusCodes.OK).json(result.data);
};
