import { useUploadMutation } from "@modules/home";

export function UploadFile() {
  const uploadMutate = useUploadMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) uploadMutate.mutate(file);

    e.target.value = "";
  };

  return (
    <div className="flex h-fit w-full max-w-4xl flex-col items-center justify-center gap-4 rounded border p-4 shadow">
      <h1 className="font-bold uppercase">Upload de arquivo</h1>

      <div className="relative rounded-md border-2 border-dashed bg-muted shadow-sm">
        <input
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-hidden="true"
          onChange={handleFileChange}
          disabled={uploadMutate.isPending}
        />

        <div className="p-4">
          <label htmlFor="file-upload" className="italic">
            <span className="font-semibold text-primary">
              Escolha um arquivo
            </span>
            <span className="text-gray-500"> ou arraste e solte</span>
          </label>
        </div>
      </div>
    </div>
  );
}
