import { type } from 'arktype';

export const postUploadParamSchema = type({
  file: { uri: 'string', type: 'string', name: 'string' },
  content: '0< string < 512',
  file_type: "'image' | 'video'",
});

export type PostUploadParam = typeof postUploadParamSchema.infer;
