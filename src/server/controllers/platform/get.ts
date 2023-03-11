import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { PlatformRequest } from '../../entity/contracts/request/platform';
import { PlatformServices } from '../../shared/services/platform';

export const Get = async (req: Request<{}, {}, {}, PlatformRequest>, res: Response) => {
  const result = await PlatformServices.getPlatforms();
  return res.status(StatusCodes.OK).json(result);
};
