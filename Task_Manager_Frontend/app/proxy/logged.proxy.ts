import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function LoggedProxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const isAuthPage =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
