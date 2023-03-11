import { Request, Response } from 'express';

import { HotsiteRequest } from '../../entity/contracts/request/hotsite';
import { HotsiteServices } from '../../shared/services/hotsite';
import { StatusCodes } from 'http-status-codes';

export const Get = async (req: Request<{}, {}, {}, HotsiteRequest>, res: Response) => {
  const result = await HotsiteServices.getHotsite(req.query);
  return res.status(StatusCodes.OK).json(result);
};
