import { fetchApi } from "@shared/lib";

export async function getFiles() {
  const response = await fetchApi("/upload/list");

  return response.json();
}
