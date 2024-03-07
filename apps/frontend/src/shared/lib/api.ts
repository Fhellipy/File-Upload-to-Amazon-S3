const baseUrl = import.meta.env.VITE_BASE_API_URL as string;

export async function fetchApi(
  input: string,
  init?: RequestInit | undefined,
): Promise<Response> {
  const url = new URL(input, baseUrl);

  const response = await fetch(url, init);

  if (response.ok) {
    return response;
  }

  throw new Error(response.statusText);
}
