import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"

const { auth } = NextAuth(authConfig)

const authOnlyRoutes = ["/organizaciones/registro", "/voluntarios/registro", "/voluntarios/calendario"]
const orgRoutes = ["/organizaciones/perfil", "/organizaciones/pedidos", "/organizaciones/colectas", "/organizaciones/adopciones"]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const needsAuth = authOnlyRoutes.some((route) => pathname.startsWith(route))
  const needsOrg = orgRoutes.some((route) => pathname.startsWith(route))

  if ((needsAuth || needsOrg) && !req.auth) {
    const loginUrl = new URL("/voluntarios/login", req.nextUrl.origin)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return Response.redirect(loginUrl)
  }

  const role = req.auth?.user?.role
  const voluntarioId = req.auth?.user?.voluntarioId

  if (pathname.startsWith("/organizaciones/registro") && role === "organizacion") {
    return Response.redirect(new URL("/organizaciones/perfil", req.nextUrl.origin))
  }

  if (pathname.startsWith("/voluntarios/registro") && voluntarioId) {
    return Response.redirect(new URL("/voluntarios/calendario", req.nextUrl.origin))
  }

  if (needsOrg && role !== "organizacion") {
    return Response.redirect(new URL("/", req.nextUrl.origin))
  }
})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
