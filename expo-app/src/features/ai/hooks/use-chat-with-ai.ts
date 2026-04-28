import { useMutation } from '@tanstack/react-query';

import { askAiApi } from '../api/ask-ai.api';
import { aiRepository } from '@/db/repositories/ai.repository';

export function useChatWithAi() {
  return useMutation({
    mutationFn: askAiApi,
    onSuccess: async (data) => {
      console.log(data);

      await aiRepository.create({ text: data.response, sender: 'ai' });
    },
    onError: (error) => {
      alert(error);
    },
  });
}
