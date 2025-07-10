import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const expectedToken = process.env.PAGE_AUTH_TOKEN!;

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (!pathname.startsWith("/portfolio/")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const name = segments[2];

  const token = searchParams.get("token");
  if (!token || !name) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const fixed = token.replace(/ /g, "+");
  if (fixed !== expectedToken) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portfolio/:path*"],
};
