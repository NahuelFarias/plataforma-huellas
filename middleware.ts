import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"

const { auth } = NextAuth(authConfig)

const protectedRoutes = ["/organizaciones/perfil", "/voluntarios/calendario"]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !req.auth) {
    const loginUrl = new URL("/voluntarios/login", req.nextUrl.origin)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return Response.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
