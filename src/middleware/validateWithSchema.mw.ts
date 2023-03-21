import { IMiddleware } from 'koa-router';
import { Schema, ValidateOptions } from 'yup';
import validateWithSchemaUtils from '../utils/validateWithSchema';

const validateWithSchema: (
  schema: Schema,
  option?: ValidateOptions
) => IMiddleware = (schema, option) => async (ctx, next) => {
  await validateWithSchemaUtils(ctx.request.body, schema, option);
  await next();
};

export default validateWithSchema;
