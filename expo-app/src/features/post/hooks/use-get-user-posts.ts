import { useInfiniteQuery } from '@tanstack/react-query';

import { GetAllPostParam } from '../schemas/get-all/param.schema';
import { getUserPostsApi } from '../api/get-user-posts';

export function useGetUserPosts({
  limit = 10,
  offset = 0,
}: GetAllPostParam = {}) {
  return useInfiniteQuery({
    queryKey: ['user-posts', limit, offset],
    initialPageParam: offset,
    queryFn: ({ pageParam }) =>
      getUserPostsApi({ limit, offset: pageParam as number }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < limit ? undefined : offset + allPages.length * limit,
  });
}
