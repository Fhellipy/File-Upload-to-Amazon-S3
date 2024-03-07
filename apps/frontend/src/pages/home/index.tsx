import { FileList, UploadFile } from "@modules/home";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center gap-4 p-4">
      <UploadFile />
      <FileList />
    </main>
  );
}
