import { useDeleteFileMutation, useFileListQuery } from "@modules/home";
import { AlertCircleIcon, DownloadIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

export function FileList() {
  const fileListQuery = useFileListQuery();
  const deleteFileMutate = useDeleteFileMutation();

  if (fileListQuery.isLoading) {
    return (
      <span className="h-14 w-14 animate-spin rounded-full border-8 border-primary border-l-transparent"></span>
    );
  }

  if (fileListQuery.error) {
    return (
      <div className="flex flex-col items-center gap-2">
        <AlertCircleIcon size={60} className="w-fit text-destructive" />

        <p>Error: {fileListQuery.error?.message}</p>
      </div>
    );
  }

  const files = fileListQuery.data || [];

  return (
    <div className="flex w-full max-w-4xl flex-col overflow-y-hidden rounded border shadow">
      <h2 className="border-b bg-muted p-4 font-bold uppercase">
        Lista de arquivos
      </h2>

      {files.length === 0 && (
        <div className="p-2 text-center">
          <p>Nenhum arquivo encontrado</p>
        </div>
      )}

      {files.length > 0 && (
        <ul className="flex h-full max-h-screen w-full flex-col gap-2 overflow-y-auto p-4 ">
          {files.map(file => (
            <li
              key={file.key}
              className="flex flex-col items-center justify-between gap-2 rounded border bg-muted p-2 shadow sm:flex-row sm:items-center"
            >
              <img
                src={file.url}
                alt={file.key}
                className="h-28 w-28 border text-center text-sm"
              />

              <div className="flex items-center gap-1">
                <a href={file.url}>
                  <button
                    className="rounded bg-primary p-2 text-primary-foreground"
                    onClick={() => toast.success("Download iniciado!")}
                  >
                    <DownloadIcon size={18} />
                  </button>
                </a>

                <button
                  className="rounded bg-destructive p-2 text-destructive-foreground"
                  onClick={() => deleteFileMutate.mutate(file.key)}
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
