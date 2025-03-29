"use server";
import { getAdminAuth, setAdminAuth } from "@/lib/AdminAuth";
import { Department } from "@/types/Department";
import { User } from "@/types/User";
import { AppointmentStatus } from "@/utils/enums/appointment-status";
import { UserRole } from "@/utils/enums/roles";
import { apiPost } from "@/utils/fetchApi/apiPost";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = {
  error?: string;
  errors?: string[];
};

export async function AdminLoginForm(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  const result = await apiPost<{ access_token: string; admin: any }>(
    "POST",
    "/admin/signin",
    {
      email,
      password,
    }
  );

  if ("error" in result) {
    return result;
  }
  await setAdminAuth(result.access_token);
  redirect("/admin");
}

export async function createUser(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const departmentId =
    formData.get("role") === UserRole.Pateint
      ? null
      : formData.get("departmentId");
  const token = await getAdminAuth();
  const access_token = token?.value;
  const formDataObject = Object.fromEntries(formData.entries());
  const data = { ...formDataObject, departmentId };
  const result = await apiPost<User>(
    "POST",
    "/users/signup",
    data,
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function createDepartment(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const name = formData.get("name");
  const result = await apiPost<Department>(
    "POST",
    "/department",
    { name },
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin/departments");
}

export async function updateDepartment(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const name = formData.get("name");
  const id = formData.get("departmentId");
  const result = await apiPost<Department>(
    "PATCH",
    `/department/${id}`,
    { name },
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin/departments");
}

export async function deleteDepartment(id: number): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const result = await apiPost<Department>(
    "DELETE",
    `/department/${id}`,
    {},
    access_token
  );
  revalidatePath("/", "layout");
  redirect("/admin/departments");
}

export async function AdminChangeEmail(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string | null;
  const token = await getAdminAuth();
  const access_token = token?.value;
  const result = await apiPost<{ access_token: string; admin: any }>(
    "PATCH",
    "/admin/change-email",
    {
      email,
    },
    access_token
  );

  if ("error" in result) {
    return result;
  }
  redirect("/admin");
}

export async function AdminChangePassword(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const oldPassword = formData.get("oldPassword") as string | null;
  const newPassword = formData.get("newPassword") as string | null;
  const token = await getAdminAuth();
  const access_token = token?.value;
  const result = await apiPost<{ access_token: string; admin: any }>(
    "PATCH",
    "/admin/change-password",
    {
      oldPassword,
      newPassword,
    },
    access_token
  );

  if ("error" in result) {
    return result;
  }
  redirect("/admin");
}

export async function createAppointment(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const date = formData.get("date");
  const note = formData.get("note");
  const doctorId = formData.get("doctorId");
  const patientId = formData.get("patientId");

  const result = await apiPost<Department>(
    "POST",
    `/appointment/create`,
    { date, note, patientId, doctorId },
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin/appointments");
}

export async function updateAppointment(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const date = formData.get("date");
  const note = formData.get("note");
  let object: any = { note };
  if (date) {
    object = { ...object, date };
  }
  const id = formData.get("appointmentId");
  const result = await apiPost<Department>(
    "PATCH",
    `/appointment/${id}`,
    object,
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin/appointments");
}

export async function updateAppointmentStatus(
  status: AppointmentStatus,
  id: number
): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const result = await apiPost<Department>(
    "PATCH",
    `/appointment/${id}`,
    { status },
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin/appointments");
}

export async function createTransaction(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const status = formData.get("status");
  const fee = formData.get("fee") as number | null;
  const patientId = formData.get("patientId");
  const note = formData.get("note");

  const new_fee = fee ? +fee : 0;

  const result = await apiPost<Department>(
    "POST",
    "/payment",
    { note, fee: new_fee, patientId, status },
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin/transactions");
}

export async function updateTrasnaction(
  _prevState: unknown,
  formData: FormData
): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const fee = formData.get("fee") as number | null;
  const note = formData.get("note");
  const id = formData.get("transactionId");
  const new_fee = fee ? +fee : 0;

  const result = await apiPost<Department>(
    "PATCH",
    `/payment/${id}`,
    { fee: new_fee, note },
    access_token
  );
  if ("error" in result) {
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/admin/transactions");
}

export async function deleteTransaction(id: number): Promise<ActionState> {
  const token = await getAdminAuth();
  const access_token = token?.value;
  const result = await apiPost<Department>(
    "DELETE",
    `/payment/${id}`,
    {},
    access_token
  );
  revalidatePath("/", "layout");
  redirect("/admin/transactions");
}
