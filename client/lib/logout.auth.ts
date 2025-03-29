import { cookies } from "next/headers";

export async function clearAuth() {
  const cookieStore = await cookies();

  cookieStore.delete("userToken");

  cookieStore.delete("userRole");

  cookieStore.delete("adminToken");
}
