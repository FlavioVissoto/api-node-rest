import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { PokemonServices } from '../../shared/services';
import { GetRequest } from './request/get.request';

export const getSprites = async (req: Request<{}, {}, {}, GetRequest>, res: Response) => {
  try {
    const result = await PokemonServices.getSprites(req.query);
    return res.status(StatusCodes.OK).json(result.versions);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
