import { AppointmentStatus } from "@/utils/enums/appointment-status";
import { User } from "./User";

export interface Appointment {
  id: number;
  patient: User;
  doctor: User;
  date: string;
  note: string;
  status: AppointmentStatus;
}
