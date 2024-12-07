import { NextRequest, NextResponse } from "next/server";
import { cookieStorageManager } from "./utils";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ["/", "/welcome", "/signup", "/auth/login"];
  const protectedRoutes = ["/main", "/settings"];
  const storage_key = "user_identity";
  const session = request.cookies.get(storage_key);

  // Responder temporalmente con el valor de session para depuración
  // return new Response(JSON.stringify({ session }), { status: 200 });

  if (!session && pathname === "/") {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (session && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/welcome",
    "/signup",
    "/auth/login",
    "/main/:path*",
    "/settings/:path*",
  ],
};
