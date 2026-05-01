import { View } from 'react-native';
import { PostForm } from '@/features/post/components/form';
import { useUploadPost } from '@/features/post/hooks/use-upload-post';
import { Description } from 'heroui-native/description';

export default function IUploadScreen() {
  const { mutate, isPending } = useUploadPost();

  return (
    <View className="flex-1 justify-center items-center">
      <Description className="text-2xl font-bold">Upload a Post</Description>
      <PostForm
        handleFormSubmit={mutate}
        isSubmitting={isPending}
        className="w-full max-w-4xl"
      />
    </View>
  );
}
