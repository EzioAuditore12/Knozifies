import { typedFetch } from '@/lib/fetch';
import { GetAllPostParam } from '../schemas/get-all/param.schema';
import { env } from '@/env';
import { postSchema } from '../schemas/post.schema';

export const getAllPostApi = async ({ limit, offset }: GetAllPostParam) => {
  const params = {
    ...(limit !== undefined ? { limit } : {}),
    ...(offset !== undefined ? { offset } : {}),
  };

  return await typedFetch({
    url: `${env.AI_URL}/posts`,
    method: 'GET',
    schema: postSchema.array(),
    params,
  });
};
