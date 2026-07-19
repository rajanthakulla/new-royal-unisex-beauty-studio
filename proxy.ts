import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  
  if (isOnAdmin) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', req.nextUrl))
    // Could also check if req.auth.user.role === 'ADMIN'
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
