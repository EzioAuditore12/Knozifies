import { FlashList, type FlashListProps } from '@shopify/flash-list';

import { PostCard } from './post-card';
import { Post } from '@/features/post/schemas/post.schema';

interface PostListProps extends Omit<
  FlashListProps<Post>,
  'renderItem' | 'keyExtractor'
> {
  data: Post[];
}

export function PostList({ data, ...props }: PostListProps) {
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <PostCard data={item} className="mb-4" />}
      keyExtractor={(item) => item.id.toString()}
      {...props}
    />
  );
}
