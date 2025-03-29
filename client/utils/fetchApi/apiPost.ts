export async function apiPost<T>(
  method: "PUT" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  data: unknown,
  token?: string
): Promise<T | { error: string; errors?: string[] }> {
  if (!process.env.API_URL) {
    return { error: "Server configuration error. Please try again later." };
  }

  try {
    const response = await fetch(`${process.env.API_URL}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        error:
          typeof responseData.message === "string"
            ? responseData.message
            : "Request failed",
        errors: Array.isArray(responseData.message) ? responseData.message : [],
      };
    }

    return responseData;
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}
