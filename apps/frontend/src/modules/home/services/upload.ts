import { fetchApi } from "@shared/lib";
import toast from "react-hot-toast";

export async function upload(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return toast.promise(
    fetchApi("/upload", {
      method: "POST",
      body: formData,
    }),

    {
      loading: "Upload em progresso...",
      success: "Upload concluído com sucesso!",
      error: error => error.message || "Erro ao fazer upload",
    },
  );
}
