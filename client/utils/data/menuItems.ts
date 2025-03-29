"use client";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiMail,
  FiLock,
} from "react-icons/fi";
import { MdLogout } from "react-icons/md";

export const adminMenuItems = [
  { name: "Dashboard", path: "/admin", icon: FiHome },
  { name: "Manage Doctors", path: "/admin/doctors", icon: FiUsers },
  { name: "Manage Patients", path: "/admin/patients", icon: FiUsers },
  { name: "Manage Departments", path: "/admin/departments", icon: FiBriefcase },
  {
    name: "Manage Appointments",
    path: "/admin/appointments",
    icon: FiCalendar,
  },
  {
    name: "Manage Transactions",
    path: "/admin/transactions",
    icon: FiDollarSign,
  },
  { name: "Change Email", path: "/admin/change-email", icon: FiMail },
  { name: "Change Password", path: "/admin/change-password", icon: FiLock },
];

export const patientItems = [
  { name: "Profile", path: "/user", icon: FiHome },
  { name: "Manage Appointments", path: "/user/appointments", icon: FiCalendar },
  {
    name: "Manage Transactions",
    path: "/user/transactions",
    icon: FiDollarSign,
  },
  { name: "Change Email", path: "/user/change-email", icon: FiMail },
  { name: "Change Password", path: "/user/change-password", icon: FiLock },
];

export const doctorItems = [
  { name: "Profile", path: "/user", icon: FiHome },
  { name: "Manage Appointments", path: "/user/appointments", icon: FiCalendar },
  { name: "Change Email", path: "/user/change-email", icon: FiMail },
  { name: "Change Password", path: "/user/change-password", icon: FiLock },
];
