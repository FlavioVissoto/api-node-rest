import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { GetRequest } from './request/get.request';

export const get = async (req: Request<{}, {}, GetRequest>, res: Response) => {
  return res.status(StatusCodes.OK).json(req.query);
};
