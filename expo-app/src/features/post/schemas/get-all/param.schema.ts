import { type } from 'arktype';

export const getAllPostParamSchema = type({
  limit: 'number?',
  offset: 'number?',
});

export type GetAllPostParam = typeof getAllPostParamSchema.infer;
