"use server";

import { clearAuth } from "@/lib/logout.auth";
import { redirect } from "next/navigation";

export async function LogoutAction(path: string) {
  await clearAuth();
  redirect(path);
}
