import { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { BottomSheet } from 'heroui-native/bottom-sheet';
import { Button } from 'heroui-native/button';
import { Description } from 'heroui-native/description';
import { Avatar } from 'heroui-native/avatar';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
}

interface CommentsBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export function CommentsBottomSheet({
  isOpen,
  onOpenChange,
  comments,
  onAddComment,
}: CommentsBottomSheetProps) {
  const [input, setInput] = useState('');

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content style={{ maxHeight: '70%' }}>
          <View className="items-center mb-2">
            <BottomSheet.Title className="text-center">
              Comments
            </BottomSheet.Title>
          </View>
          <View className="flex-1 mb-2">
            {comments.length === 0 ? (
              <Description className="text-center text-gray-400">
                No comments yet. Be the first to comment!
              </Description>
            ) : (
              comments.map((comment) => (
                <View
                  key={comment.id}
                  className="flex-row items-start mb-4 px-2"
                >
                  <Avatar alt={comment.user.avatar} className="size-8 mt-1">
                    <Avatar.Image source={{ uri: comment.user.avatar }} />
                    <Avatar.Fallback>{comment.user.name[0]}</Avatar.Fallback>
                  </Avatar>
                  <View className="ml-2 flex-1">
                    <Description className="font-bold">
                      {comment.user.name}
                    </Description>
                    <Description>{comment.text}</Description>
                  </View>
                </View>
              ))
            )}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
            className="flex-row items-center gap-2 px-2 pb-2"
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Add a comment..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 bg-white"
              onSubmitEditing={() => {
                if (input.trim()) {
                  onAddComment(input.trim());
                  setInput('');
                }
              }}
              returnKeyType="send"
            />
            <Button
              variant="secondary"
              onPress={() => {
                if (input.trim()) {
                  onAddComment(input.trim());
                  setInput('');
                }
              }}
            >
              Send
            </Button>
          </KeyboardAvoidingView>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
