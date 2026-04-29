import { View, Image } from 'react-native';
import { Avatar } from 'heroui-native/avatar';
import { Button } from 'heroui-native/button';
import { Card, type CardRootProps } from 'heroui-native/card';
import { Description } from 'heroui-native/description';
import { cn } from 'tailwind-variants';
import { useState } from 'react';

import { Ionicons } from '@/components/icon';

import { CommentsBottomSheet } from './comments-bottom-sheet';

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
}

interface PostCardProps extends CardRootProps {
  data: Post;
}

export function PostCard({ className, data, ...props }: PostCardProps) {
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const [comments, setComments] = useState([
    {
      id: '1',
      user: {
        name: 'alice',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      text: 'Awesome post!',
    },
    {
      id: '2',
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
        id: (prev.length + 1).toString(),
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
      <Card className={cn(className)}>
        <View className="flex-row items-center px-4 py-2">
          <Avatar alt={data.user.avatar} className="size-10">
            <Avatar.Image source={{ uri: data.user.avatar }} />
            <Avatar.Fallback>{data.user.name[0]}</Avatar.Fallback>
          </Avatar>
          <Description className="ml-3 font-bold">{data.user.name}</Description>
        </View>
        <Image
          source={{ uri: data.image }}
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
          <Description className="font-bold">{data.likes} likes</Description>
          <Description numberOfLines={2}>
            <Description className="font-bold">{data.user.name} </Description>
            {data.caption}
          </Description>
          <Description className="text-gray-500">
            View all {data.comments} comments
          </Description>
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
