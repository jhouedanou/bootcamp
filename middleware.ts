import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const user = req.auth?.user
  const role = user?.role

  // Already logged in → redirect away from login/inscription
  if (pathname.startsWith("/login") || pathname.startsWith("/inscription")) {
    if (user) {
      const dest = role === "admin" ? "/admin" : "/espace-personnel"
      return NextResponse.redirect(new URL(dest, req.url))
    }
    return NextResponse.next()
  }

  // Admin routes → require admin role
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/espace-personnel", req.url))
    }
    return NextResponse.next()
  }

  // Espace personnel → require any authenticated user
  if (pathname.startsWith("/espace-personnel")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/espace-personnel/:path*", "/login", "/inscription"],
}
