import { type } from 'arktype';

export const postSchema = type({
  id: 'number',
  media_type: "'image' | 'video'",
  user_id: 'string.uuid',
  username: 'string',
  content: 'string',
  bucket_url: 'string.url',
});

export type Post = typeof postSchema.infer;
