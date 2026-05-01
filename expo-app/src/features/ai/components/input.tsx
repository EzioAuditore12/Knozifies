import { Button } from 'heroui-native/button';
import { Input } from 'heroui-native/input';
import { Keyboard, View, type ViewProps } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { cn } from 'tailwind-variants';
import { Select } from 'heroui-native/select';
import { Controller, useForm } from 'react-hook-form';
import { type } from 'arktype';
import { arktypeResolver } from '@hookform/resolvers/arktype';

import { useGradualAnimation } from '@/hooks/use-gradual-animation';
import { ConversationGroup } from '@/db/tables/conversation-group.table';
import { AskAiParam } from '../schemas/ask-ai/param.schema';

interface AiChatInputProps extends ViewProps {
  groups: Pick<ConversationGroup, 'id' | 'name'>[];
  isLoadingGroups: boolean;
  handleMutation: (params: Omit<AskAiParam, 'chats'>) => void;
  isMutationPending: boolean;
}

const paramSchema = type({
  query: '0 < string < 120',
  groupId: 'string',
});

export function AiChatInput({
  className,
  groups,
  isLoadingGroups,
  handleMutation,
  isMutationPending,
  ...props
}: AiChatInputProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: arktypeResolver(paramSchema),
  });

  const { height } = useGradualAnimation();

  const keyboardPadding = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);

  const onSubmit = (data: typeof paramSchema.infer) => {
    console.log(data);
    const selectedGroup = groups.find((g) => g.id === data.groupId);

    if (selectedGroup) {
      handleMutation({
        group: {
          group_id: selectedGroup.id,
          group_name: selectedGroup.name,
        },
        query: data.query,
      });
    }

    reset();
  };

  return (
    <View
      className={cn(
        'border-t border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-black',
        className,
      )}
      {...props}
    >
      <View className="flex-row items-end gap-x-2">
        <Controller
          control={control}
          name="query"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              className={cn('flex-[2_2_0%]', errors.query && 'border-red-500')}
              placeholder="Ask Knozi Ai..."
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              textAlignVertical="top"
              multiline
              maxLength={1000}
            />
          )}
        />
        <Controller
          control={control}
          name="groupId"
          render={({ field: { onChange, value } }) => {
            const selectedGroup = groups.find((g) => g.id === value);
            return (
              <Select
                className="flex-[1_1_0%]"
                presentation="bottom-sheet"
                value={
                  selectedGroup
                    ? { value: selectedGroup.id, label: selectedGroup.name }
                    : undefined
                }
                onValueChange={(option) => onChange(option?.value)}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Group" />
                  <Select.TriggerIndicator />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Overlay />
                  <Select.Content presentation="bottom-sheet">
                    {groups.map((c) => (
                      <Select.Item key={c.id} value={c.id} label={c.name} />
                    ))}
                  </Select.Content>
                </Select.Portal>
              </Select>
            );
          }}
        />
        <Button
          onPress={() => {
            handleSubmit(onSubmit)();
            Keyboard.dismiss();
          }}
          isDisabled={isMutationPending}
          size="sm"
          className="mb-1"
        >
          Send
        </Button>
      </View>
      <Animated.View style={keyboardPadding} />
    </View>
  );
}
