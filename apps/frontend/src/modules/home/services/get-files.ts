import { fetchApi } from "@shared/lib";

export async function getFiles() {
  const response = await fetchApi("/list");

  return response.json();
}
