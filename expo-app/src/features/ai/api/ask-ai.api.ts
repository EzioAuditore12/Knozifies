import { env } from '@/env';

import { typedFetch } from '@/lib/fetch';

import { askAiResponseSchema } from '../schemas/ask-ai/response.schema';
import { AskAiParam } from '../schemas/ask-ai/param.schema';
import { chatGroupRepository } from '@/db/repositories/chat-group.repository';
import { aiRepository } from '@/db/repositories/ai.repository';

export const askAiApi = async (data: Omit<AskAiParam, 'chats'>) => {
  await aiRepository.create({ text: data.query, sender: 'human' });

  const groupChats = await chatGroupRepository.getAllWithUser(data.group.group_id);

  const mappedChats: AskAiParam['chats'] = groupChats.map((chat) => ({
    message: chat.text,
    username: `${chat.user?.firstName} ${chat.user?.lastName}`,
    created_at: new Date(chat.createdAt).toISOString().slice(0, 19),
  }));

  return await typedFetch({
    url: `${env.AI_URL}/send`,
    method: 'POST',
    body: { ...data, chats: mappedChats },
    schema: askAiResponseSchema,
  });
};
