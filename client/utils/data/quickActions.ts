"use client";
import { FiUserPlus, FiCalendar, FiDollarSign } from "react-icons/fi";
export const adminActions = [
  { icon: FiUserPlus, label: "Add New User", path: "admin/create-user" },
  {
    icon: FiCalendar,
    label: "Create Appointment",
    path: "admin/create-appointment",
  },
  {
    icon: FiDollarSign,
    label: "Add Payment",
    path: "admin/create-transaction",
  },
];
