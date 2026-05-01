import { useState, Activity } from 'react';
import { Alert, View, type ViewProps } from 'react-native';
import { Image } from 'expo-image';
import { Controller, useForm } from 'react-hook-form';
import { Label } from 'heroui-native/label';
import { TextField } from 'heroui-native/text-field';
import { cn } from 'tailwind-variants';
import * as ImagePicker from 'expo-image-picker';

import { FieldError } from 'heroui-native/field-error';
import { Button } from 'heroui-native/button';
import { TextArea } from 'heroui-native/text-area';

import {
  PostUploadParam,
  postUploadParamSchema,
} from '../schemas/param.schema';
import { arktypeResolver } from '@hookform/resolvers/arktype';

interface PostFormProps extends ViewProps {
  isSubmitting: boolean;
  handleFormSubmit: (data: PostUploadParam) => void;
}

export function PostForm({
  className,
  handleFormSubmit,
  isSubmitting,
  ...props
}: PostFormProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostUploadParam>({
    defaultValues: {
      content: '',
      file_type: 'image',
      file: {
        name: '',
        type: '',
        uri: '',
      },
    },
    resolver: arktypeResolver(postUploadParamSchema),
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];

      setSelectedImage(asset.uri);
      setValue('file', {
        name: asset.fileName ?? 'image.jpg',
        type: asset.mimeType ?? 'image/jpeg',
        uri: asset.uri,
      });
    }
  };

  const onSubmit = async (data: PostUploadParam) => {
    console.log(data);
    handleFormSubmit(data);
  };

  return (
    <View className={cn('p-2 flex-col gap-y-2', className)} {...props}>
      <Button onPress={pickImage}>Pick image</Button>
      <Activity mode={selectedImage ? 'visible' : 'hidden'}>
        <Image
          source={{ uri: selectedImage ?? '' }}
          style={{
            width: '100%',
            height: 240,
            borderRadius: 12,
            marginTop: 12,
          }}
          contentFit="cover"
        />
      </Activity>

      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField isRequired isInvalid={errors.content ? true : false}>
            <Label>Content</Label>
            <TextArea
              placeholder="Enter Content"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            <FieldError>{errors.content?.message}</FieldError>
          </TextField>
        )}
      />

      <Button isDisabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        Upload
      </Button>
    </View>
  );
}
