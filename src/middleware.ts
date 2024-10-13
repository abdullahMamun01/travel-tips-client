import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./actions/auth.action";

const publicRoutes = ["/", "/login", "/register", "/posts**"];

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  const pathName = request.nextUrl.pathname;

  const isPublicRoute =
    publicRoutes.includes(pathName) || pathName.startsWith("/posts");

  if (pathName.startsWith("/_next") || pathName.startsWith("/static")) {
    return NextResponse.next();
  }

  if (!user && !isPublicRoute ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  else if(pathName.startsWith('/dashboard') && user?.role === 'user'){
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
