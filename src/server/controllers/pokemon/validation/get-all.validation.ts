import { number, object, ObjectSchema } from 'yup';

import { validation } from '../../../shared/middleware';
import { GetAllRequest } from '../request/get-all.request';

const getAllValidation: ObjectSchema<GetAllRequest> = object().shape({
  limit: number().required(),
  offset: number().optional(),
});

export const GetAllValidation = validation({
  query: getAllValidation,
});
