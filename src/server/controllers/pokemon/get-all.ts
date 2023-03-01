import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { GetAllRequest } from './request/get-all.request';

export const getAll = async (req: Request<{}, {}, GetAllRequest>, res: Response) => {
  const result: AxiosResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: req.query,
  });

  return res.status(StatusCodes.OK).json(result.data);
};
