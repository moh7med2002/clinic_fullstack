import { User } from "@/types/User";
import { apiGet } from "@/utils/fetchApi/apiGet";
import { getUserAuth } from "./UserAuth";

export async function whoAmI() {
  const token = await getUserAuth();
  const access_token = token?.value;
  const result = await apiGet<User>(`/users/whoamI`, access_token);
  return result;
}
