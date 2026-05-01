import { useInfiniteQuery } from '@tanstack/react-query';
import { GetAllPostParam } from '../schemas/get-all/param.schema';
import { getAllPostApi } from '../api/get-all-post.api';

export function useGetPosts({ limit = 10, offset = 0 }: GetAllPostParam = {}) {
  return useInfiniteQuery({
    queryKey: ['posts', limit, offset],
    initialPageParam: offset,
    queryFn: ({ pageParam }) =>
      getAllPostApi({ limit, offset: pageParam as number }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < limit ? undefined : offset + allPages.length * limit,
  });
}
