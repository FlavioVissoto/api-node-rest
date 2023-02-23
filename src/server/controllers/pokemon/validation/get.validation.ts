import { number, object, ObjectSchema } from 'yup';

import { GetRequest } from '../request/get.request';

export const GetValidation: ObjectSchema<GetRequest> = object({
  id: number().required(),
});
