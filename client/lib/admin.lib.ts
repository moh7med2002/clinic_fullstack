import { Admin } from "@/types/Admin";
import { apiGet } from "@/utils/fetchApi/apiGet";
import { getAdminAuth } from "./AdminAuth";

export async function getAdmin() {
  const token = await getAdminAuth();
  const access_token = token ? token.value : "";
  const result = await apiGet<Admin>("/admin", access_token);
  return result;
}
