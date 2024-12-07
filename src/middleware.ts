import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookieStorageManager } from "./utils";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ["/", "/welcome", "/signup", "/auth/login"];
  const protectedRoutes = ["/main", "/settings"];
  const storage_key = "user_identity";
  const session = cookieStorageManager.get(storage_key);

  if (!session) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/welcome", request.url));
    }

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  }

  const { exp } = jwtDecode<{ exp: number }>(session.token);
  if (Date.now() >= exp * 1000) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/:path"],
  matcher: [
    "/",
    "/welcome",
    "/signup",
    "/auth/login",
    "/main/:path*",
    "/settings/:path*",
  ],
};
