import { roles, UserRole } from "@/utils/enums/roles";
import { cookies } from "next/headers";

export async function getUserAuth() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("userToken");
  return userToken;
}

// export async function getUserRole() {
//   const cookieStore = await cookies();
//   const role = cookieStore.get("userRole");
//   return role;
// }

export async function getUserRole(): Promise<roles | null> {
  const cookieStore = await cookies();
  const role = cookieStore.get("userRole");

  // Check if the role is valid and return the corresponding UserRole, or null if invalid
  if (role && Object.values(roles).includes(role.value as roles)) {
    console.log(role.value);
    return role.value as roles;
  }

  return null;
}

export async function setUserAuth(token: string, role: UserRole) {
  const cookieStore = await cookies();

  cookieStore.set("userToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration
  });

  cookieStore.set("userRole", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration
  });
}
