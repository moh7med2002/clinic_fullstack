import { Transaction } from "@/types/Transaction";
import { apiGet } from "@/utils/fetchApi/apiGet";
import { getUserAuth } from "./UserAuth";
import { getAdminAuth } from "./AdminAuth";

export async function getTransactions() {
  const result = await apiGet<Transaction[]>("/payment");
  return result;
}

export async function getLatestTransactions() {
  const result = await apiGet<Transaction[]>("/payment/latest");
  return result;
}

export async function getSingleTransaction(id: number) {
  const result = await apiGet<Transaction>(`/payment/${id}`);
  return result;
}

export async function getUserTransactions() {
  const token = await getUserAuth();
  const access_token = token?.value;
  const result = await apiGet<Transaction[]>(`/payment/user`, access_token);
  return result;
}

export async function getUserTransactionsByAdmin(userId: string) {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const result = await apiGet<Transaction[]>(
    `/payment/user/${userId}`,
    access_token
  );
  return result;
}
