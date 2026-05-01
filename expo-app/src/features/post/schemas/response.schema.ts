import { type } from 'arktype';

export const postUploadResponseSchema = type({
  bucket_url: 'string.url',
  content: 'string',
  id: 'number',
  media_type: "'image' | 'video'",
  user_id: 'string.uuid',
});

export type postUploadResponse = typeof postUploadResponseSchema.infer;
