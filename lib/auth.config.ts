import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export default {
  providers: [Google],
  pages: {
    signIn: "/voluntarios/login",
  },
  callbacks: {
    jwt({ token }) {
      if (token.role === undefined) {
        token.role = "voluntario"
      }
      return token
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      session.user.role = (token.role as "voluntario" | "organizacion") ?? "voluntario"
      session.user.organizacionId = (token.organizacionId as string) ?? null
      return session
    },
  },
} satisfies NextAuthConfig
