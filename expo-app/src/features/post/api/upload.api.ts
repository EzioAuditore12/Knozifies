import { env } from '@/env';

import type { PostUploadParam } from '../schemas/param.schema';
import { authenticatedTypedFetch } from '@/lib/auth.api';
import { postUploadResponseSchema } from '../schemas/response.schema';

export const uploadPostApi = async (data: PostUploadParam) => {
  const formData = new FormData();
  formData.append('file', {
    uri: data.file.uri,
    type: data.file.type,
    name: data.file.name,
  } as any);
  formData.append('content', data.content);
  formData.append('file_type', data.file_type);

  const response = await authenticatedTypedFetch({
    baseUrl: env.AI_URL,
    url: 'upload',
    method: 'POST',
    body: formData,
    schema: postUploadResponseSchema,
  });

  return response;
};
