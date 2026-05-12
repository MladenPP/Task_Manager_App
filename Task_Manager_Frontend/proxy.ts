import { NextRequest } from "next/server";
import { LoggedProxy } from "./app/proxy/logged.proxy";

export function proxy(req: NextRequest) {
  return LoggedProxy(req);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.well-known).*)"],
};
