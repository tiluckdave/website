import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// PRD Section 2 — Domain redirects
// hire.tiluckdave.in → tiluckdave.in/hire (301)
// www.tiluckdave.in → tiluckdave.in (301)
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const url = request.nextUrl;

  if (host.startsWith("hire.")) {
    const redirectUrl = new URL(
      "/hire" + url.pathname,
      "https://tiluckdave.in"
    );
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (host.startsWith("www.")) {
    const redirectUrl = new URL(url.pathname + url.search, "https://tiluckdave.in");
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
