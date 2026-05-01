import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadPostApi } from '../api/upload.api';

export function useUploadPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPostApi,
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({ queryKey: ['posts'] });

      alert('Post uploaded successfully');
    },
    onError: (error) => {
      console.log(error.message);
      alert(error);
    },
  });
}
