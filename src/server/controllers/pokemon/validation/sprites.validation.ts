import { number, object, ObjectSchema } from 'yup';

import { validation } from '../../../shared/middleware';
import { GetRequest } from '../request/get.request';

export const spritesValidationRule: ObjectSchema<GetRequest> = object({
  id: number().required(),
});

export const GetSpritesValidation = validation({
  query: spritesValidationRule,
});
