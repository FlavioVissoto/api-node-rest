import { number, object, ObjectSchema } from 'yup';

import { GetAllRequest } from '../request/get-all.request';

export const GetAllValidation: ObjectSchema<GetAllRequest> = object().shape({
  limit: number().required(),
  offset: number().optional(),
});
