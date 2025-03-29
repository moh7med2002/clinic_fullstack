import { Appointment } from "@/types/Appointment";
import { apiGet } from "@/utils/fetchApi/apiGet";
import { getUserAuth } from "./UserAuth";
import { getAdminAuth } from "./AdminAuth";

export async function getAppointments() {
  const result = await apiGet<Appointment[]>("/appointment");
  return result;
}

export async function getSingleAppointment(id: number) {
  const result = await apiGet<Appointment>(`/appointment/${id}`);
  return result;
}

export async function getUserAppointments() {
  const token = await getUserAuth();
  const access_token = token?.value;
  const result = await apiGet<Appointment[]>(`/appointment/user`, access_token);
  return result;
}

export async function getUserAppointmentsByAdmin(userId: string) {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const result = await apiGet<Appointment[]>(
    `/appointment/user/${userId}`,
    access_token
  );
  return result;
}

export async function getDailyAppointments() {
  const result = await apiGet<Appointment[]>("/appointment/daily");
  return result;
}
