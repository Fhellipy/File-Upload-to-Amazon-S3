import { fetchApi } from "@shared/lib";
import toast from "react-hot-toast";

export const deleteFile = async (key: string) => {
  const response = await toast.promise(
    fetchApi(`/file/${key}`, {
      method: "DELETE",
    }),
    {
      loading: "Excluindo arquivo...",
      success: "Arquivo excluído com sucesso!",
      error: error => error.message || "Erro ao excluir arquivo",
    },
  );

  return response;
};
