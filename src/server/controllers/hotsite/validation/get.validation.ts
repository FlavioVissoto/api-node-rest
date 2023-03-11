import { ObjectSchema, number, object } from 'yup';

import { HotsiteRequest } from '../../../entity/contracts/request/hotsite';
import { validation } from '../../../shared/middleware';

const _validation: ObjectSchema<HotsiteRequest> = object().shape({
  qtdMonths: number().required().max(13),
});

export const GetValidation = validation({
  query: _validation,
});
