import { AnyObject, ObjectSchema, ValidationError } from 'yup';

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

type TValidationType = 'header' | 'body' | 'params' | 'query';

type TValidationAllSchemas = Record<TValidationType, ObjectSchema<any, AnyObject, any, ''>>;

type TValidation = (getAllSchemas: Partial<TValidationAllSchemas>) => RequestHandler;

/**
 * Realiza a validação das requisições utilizando o YUP.
 * @param schemas Schemas do YUP que serão validados.
 * @returns
 */
export const validation: TValidation = (schemas: Partial<TValidationAllSchemas>) => async (req, res, next) => {
  const errorScope: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TValidationType], { abortEarly: false });
    } catch (error) {
      const yupError = error as ValidationError;
      const validationErrors: Record<string, string> = {};
      yupError.inner.forEach((x: ValidationError) => {
        if (!x.path) {
          return;
        }
        validationErrors[x.path] = x.message;
      });
      errorScope[key] = validationErrors;
    }
  });

  if (Object.entries(errorScope).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errorScope,
    });
  }
};
