import { Schema, ValidateOptions } from 'yup';

export default async function validateWithSchema(
  data: unknown,
  schema: Schema,
  option?: ValidateOptions
): Promise<boolean> {
  return await schema.validate(data, option);
}
