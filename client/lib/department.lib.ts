import { Department } from "@/types/Department";
import { apiGet } from "@/utils/fetchApi/apiGet";

export async function getDepartments() {
  const result = await apiGet<Department[]>("/department");
  return result;
}

export async function getDepartmentById(id: number) {
  const result = await apiGet<Department>(`/department/${id}`);
  return result;
}
