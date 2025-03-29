import { UserRole } from "@/utils/enums/roles";
import { Department } from "./Department";

export type User = {
  id: number;
  email: string;
  image: string;
  phone: string;
  name: string;
  gender: string;
  birthdate: string;
  role: UserRole;
  department?: Department;
};
