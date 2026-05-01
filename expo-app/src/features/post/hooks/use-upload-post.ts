import { useMutation } from '@tanstack/react-query';

import { uploadPostApi } from '../api/upload.api';

export function useUploadPost() {
  return useMutation({
    mutationFn: uploadPostApi,
    onSuccess: (data) => {
      console.log(data);
      alert(data);
    },
    onError: (error) => {
      console.log(error.message);
      alert(error);
    },
  });
}
