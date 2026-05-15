import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { organizacionCreateSchema } from "@/lib/validations/organizacion"
import { organizacionToJson, toPrismaCreate } from "@/lib/serializers/organizacion"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const existing = await prisma.organizacion.findUnique({
      where: { userId: session.user.id },
    })
    if (existing) {
      return NextResponse.json({ error: "Ya tenés una organización registrada" }, { status: 409 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Cuerpo JSON inválido" }, { status: 400 })
    }
    const parsed = organizacionCreateSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Datos inválidos"
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const [org] = await prisma.$transaction([
      prisma.organizacion.create({ data: toPrismaCreate(parsed.data, session.user.id) }),
      prisma.user.update({ where: { id: session.user.id }, data: { role: "organizacion" } }),
    ])

    return NextResponse.json(organizacionToJson(org), { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
