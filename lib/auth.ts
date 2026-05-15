import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "@/lib/auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id
      }
      const needsDbLookup = trigger === "signIn" || (token.id && token.role === "voluntario" && !token.organizacionId)
      if (needsDbLookup && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: { organizacion: { select: { id: true } } },
        })
        token.role = dbUser?.role ?? "voluntario"
        token.organizacionId = dbUser?.organizacion?.id ?? null
      }
      if (token.role === undefined) {
        token.role = "voluntario"
      }
      return token
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      if (token.sub) session.user.id = token.sub
      session.user.role = (token.role as "voluntario" | "organizacion") ?? "voluntario"
      session.user.organizacionId = (token.organizacionId as string) ?? null
      return session
    },
  },
})
