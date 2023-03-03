import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { PokemonServices } from '../../shared/services';
import { GetAllRequest } from './request/get-all.request';

export const getAll = async (req: Request<{}, {}, GetAllRequest>, res: Response) => {
  const result = await PokemonServices.getList(req.query);

  return res.status(StatusCodes.OK).json(result);
};
