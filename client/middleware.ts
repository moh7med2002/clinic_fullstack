import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "./lib/AdminAuth";
import { getUserAuth } from "./lib/UserAuth";

// Define protected routes
const adminProtectedRoutesPrefix = "/admin";
const userProtectedRoutesPrefix = "/user";
const publicRoutes = ["/auth/admin/login", "/", "/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Retrieve authentication tokens
  const admin_token = await getAdminAuth();
  const user_token = await getUserAuth();

  // Check if the current route is protected or public
  const isAdminProtectedRoute = path.startsWith(adminProtectedRoutesPrefix);
  const isUserProtectedRoute = path.startsWith(userProtectedRoutesPrefix);
  const isPublicRoute = publicRoutes.includes(path);

  // 🚀 If a **user** tries to access `/admin`, redirect them to `/dashboard`
  if (isAdminProtectedRoute && !admin_token && user_token) {
    return NextResponse.redirect(new URL("/user", req.nextUrl));
  }

  // 🚀 If an **admin** tries to access **user-only pages**, redirect them to `/admin`
  if (isUserProtectedRoute && admin_token && !user_token) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  // If on a protected admin route but no admin token, redirect to admin login
  if (isAdminProtectedRoute && !admin_token) {
    return NextResponse.redirect(new URL("/auth/admin/login", req.nextUrl));
  }

  // If on a protected user route but no user token, redirect to user login
  if (isUserProtectedRoute && !user_token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // If on a public route but authenticated, redirect to the appropriate dashboard
  if (isPublicRoute && (admin_token || user_token)) {
    return NextResponse.redirect(
      new URL(admin_token ? "/admin" : "/user", req.nextUrl)
    );
  }

  return NextResponse.next();
}
