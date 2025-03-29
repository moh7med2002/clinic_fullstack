import { AppointmentStatus } from "./enums/appointment-status";
import { PaymentStatus } from "./enums/payment-status";

export const getStatusLabel = (status: AppointmentStatus | PaymentStatus) => {
  switch (status) {
    case PaymentStatus.AMOUNT_OWED:
      return "Amount Owed";
    case PaymentStatus.AMOUNT_PAID:
      return "Amount Paid";
    case AppointmentStatus.pending:
      return "Pending";
    case AppointmentStatus.canceled:
      return "Canceled";
    case AppointmentStatus.completed:
      return "Completed";
    default:
      return status;
  }
};
