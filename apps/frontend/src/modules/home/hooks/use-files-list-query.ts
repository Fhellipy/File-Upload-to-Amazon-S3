import { getFiles, type FileType } from "@modules/home";
import { useQuery } from "@tanstack/react-query";

export const FILE_LIST_QUERY_KEY = "FILE_LIST_QUERY_KEY";

export function useFileListQuery() {
  return useQuery<unknown, Error, FileType[]>({
    queryKey: [FILE_LIST_QUERY_KEY],
    queryFn: getFiles,
    retry: false,
  });
}
