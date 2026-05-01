import { GetAllPostParam } from '../schemas/get-all/param.schema';
import { env } from '@/env';
import { postSchema } from '../schemas/post.schema';
import { authenticatedTypedFetch } from '@/lib/auth.api';

export const getUserPostsApi = async ({ limit, offset }: GetAllPostParam) => {
  const params = {
    ...(limit !== undefined ? { limit } : {}),
    ...(offset !== undefined ? { offset } : {}),
  };

  return await authenticatedTypedFetch({
    baseUrl: env.AI_URL,
    url: 'posts',
    method: 'GET',
    schema: postSchema.array(),
    params,
  });
};
