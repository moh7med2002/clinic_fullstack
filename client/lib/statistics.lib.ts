import { Admin } from "@/types/Admin";
import { apiGet } from "@/utils/fetchApi/apiGet";
import { getAdminAuth } from "./AdminAuth";

export interface monthlyStatisicts {
  month: number;
  appointmentsCount: number;
  revenue: number;
}

export async function getAppointmentsandRevenue() {
  const token = await getAdminAuth();
  const access_token = token ? token.value : "";
  const result = await apiGet<monthlyStatisicts[]>(
    "/statistics/monthly",
    access_token
  );
  return result;
}

export interface Statisicts {
  doctors: number;
  patients: number;
  appointments: number;
  payments: number;
}

export async function getStatistics() {
  const token = await getAdminAuth();
  const access_token = token ? token.value : "";
  const result = await apiGet<Statisicts>("/statistics", access_token);
  return result;
}
