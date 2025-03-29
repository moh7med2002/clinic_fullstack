import { cookies } from "next/headers";

export async function getAdminAuth() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("adminToken");
  return adminToken;
}

export async function setAdminAuth(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration
  });
}
