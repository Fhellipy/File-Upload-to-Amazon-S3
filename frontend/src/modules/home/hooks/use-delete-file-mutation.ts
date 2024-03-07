import { FILE_LIST_QUERY_KEY, deleteFile } from "@modules/home";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FILE_LIST_QUERY_KEY],
      });
    },
  });
}
