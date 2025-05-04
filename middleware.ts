import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
const protectedRoutes = {
    "/admin": "ADMIN",
    "/organization": "ORGANIZER",
  }
  
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  const { pathname } = request.nextUrl

  // 🔒 Redirect to sign in if not authenticated
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // 🔐 Check role-based access
  for (const [prefix, requiredRole] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(prefix) && token?.role !== requiredRole) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}



export const config = {
  matcher: ["/admin/:path*"],
}
