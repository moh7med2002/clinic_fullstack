import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("/"); // Redirect to login after clearing cookies
  // Clear the HttpOnly cookies by setting their maxAge to 0
  response.cookies.set("userToken", "", { maxAge: 0, path: "/" });
  response.cookies.set("userRole", "", { maxAge: 0, path: "/" });
  response.cookies.set("adminToken", "", { maxAge: 0, path: "/" });

  return response;
}
