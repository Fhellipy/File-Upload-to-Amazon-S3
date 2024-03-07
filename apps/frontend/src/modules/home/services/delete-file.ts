import { fetchApi } from "@shared/lib";
import toast from "react-hot-toast";

export const deleteFile = async (key: string) => {
  const response = await toast.promise(
    fetchApi(`/upload/file/${key}`, {
      method: "DELETE",
    }),
    {
      loading: "Excluindo arquivo...",
      success: "Arquivo excluído com sucesso!",
      error: "Erro ao excluir arquivo!",
    },
  );

  if (!response.ok) {
    throw new Error("An error occurred while deleting the file");
  }

  return response;
};
