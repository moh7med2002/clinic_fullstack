export async function apiGet<T>(endpoint: string, token?: string): Promise<T> {
  if (!process.env.API_URL) {
    throw new Error("Fetching data failed");
  }
  try {
    const response = await fetch(`${process.env.API_URL}${endpoint}`, {
      headers: {
        Authorization: token ? token : "",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0]
      );
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}
