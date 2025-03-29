"use server";
import { getUserAuth, setUserAuth } from "@/lib/UserAuth";
import { User } from "@/types/User";
import { apiGet } from "@/utils/fetchApi/apiGet";
import { apiPost } from "@/utils/fetchApi/apiPost";
import { redirect } from "next/navigation";

export type ActionState = {
  email?: string;
  password?: string;
  error?: string;
  errors?: string[];
};

export async function UserLoginForm(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  const result = await apiPost<{ access_token: string; user: User }>(
    "POST",
    "/users/signin",
    {
      email,
      password,
    }
  );

  if ("error" in result) {
    return result;
  }
  await setUserAuth(result.access_token, result.user.role);
  redirect("/user");
}

export async function getUsers(role?: string) {
  const result = await apiGet<User[]>(`${`/users?role=${role}`}`);
  return result;
}

export async function getSingleUser(id: string) {
  const result = await apiGet<User>(`${`/users/${id}`}`);
  return result;
}

export async function UserChangeEmail(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string | null;
  const token = await getUserAuth();
  const access_token = token?.value;
  const result = await apiPost<User>(
    "PATCH",
    "/users/change-email",
    {
      email,
    },
    access_token
  );

  if ("error" in result) {
    return result;
  }
  redirect("/user");
}

export async function UserChangePassword(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const oldPassword = formData.get("oldPassword") as string | null;
  const newPassword = formData.get("newPassword") as string | null;
  const token = await getUserAuth();
  const access_token = token?.value;
  const result = await apiPost<User>(
    "PATCH",
    "/users/change-password",
    {
      oldPassword,
      newPassword,
    },
    access_token
  );

  if ("error" in result) {
    return result;
  }
  redirect("/user");
}
