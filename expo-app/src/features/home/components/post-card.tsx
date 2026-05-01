import { View } from 'react-native';
import { Avatar } from 'heroui-native/avatar';
import { Button } from 'heroui-native/button';
import { Card, type CardRootProps } from 'heroui-native/card';
import { Description } from 'heroui-native/description';
import { Image } from 'expo-image';
import { cn } from 'tailwind-variants';
import { useState } from 'react';
import { crypto } from 'react-native-nitro-crypto';

import { Ionicons } from '@/components/icon';

import { CommentsBottomSheet } from './comments-bottom-sheet';
import { Post } from '@/features/post/schemas/post.schema';

interface PostCardProps extends CardRootProps {
  data: Post;
}

export function PostCard({ className, data, ...props }: PostCardProps) {
  const { user_id, bucket_url, content, username } = data;

  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState([
    {
      id: crypto.randomUUID(),
      user: {
        name: 'alice',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      text: 'Awesome post!',
    },
    {
      id: crypto.randomUUID(),
      user: {
        name: 'bob',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      text: 'Love this!',
    },
  ]);

  const handleAddComment = (text: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: user_id,
        user: {
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        },
        text,
      },
    ]);
  };

  return (
    <>
      <Card className={cn(className)} {...props}>
        <View className="flex-row items-center px-4 py-2">
          <Avatar alt={username} className="size-10">
            <Avatar.Image source={{ uri: '' }} />
            <Avatar.Fallback>{username[0]}</Avatar.Fallback>
          </Avatar>
          <Description className="ml-3 font-bold">{username}</Description>
        </View>
        <Image
          source={{ uri: bucket_url }}
          style={{ width: '100%', aspectRatio: 1 }}
        />
        <View className="flex-row items-center px-4 py-2 space-x-4">
          <Button variant="ghost">
            <Ionicons className="text-2xl" name="heart" />
          </Button>
          <Button variant="ghost" onPress={() => setCommentsOpen(true)}>
            <Ionicons className="text-2xl" name="chatbubble" />
          </Button>
          <Button variant="ghost">
            <Ionicons className="text-2xl" name="send" />
          </Button>
          <View className="flex-1 items-end">
            <Button variant="ghost">
              <Ionicons className="text-2xl" name="bookmark" />
            </Button>
          </View>
        </View>
        <View className="px-4 pb-2">
          <Description className="font-bold">{0} likes</Description>
          <Description numberOfLines={2}>
            <Description className="font-bold">{username} </Description>
            {content}
          </Description>
          <Description className="text-gray-500">View all comments</Description>
        </View>
      </Card>
      <CommentsBottomSheet
        isOpen={commentsOpen}
        onOpenChange={setCommentsOpen}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </>
  );
}
