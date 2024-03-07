import { FILE_LIST_QUERY_KEY, upload } from "@modules/home";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upload,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FILE_LIST_QUERY_KEY],
      });
    },
  });
}
