import { PaymentStatus } from "@/utils/enums/payment-status";
import { User } from "./User";

export interface Transaction {
  id: number;
  patient: User;
  createdAt: string;
  note: string;
  fee: number;
  status: PaymentStatus;
}
