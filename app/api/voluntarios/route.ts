import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { voluntarioCreateSchema } from "@/lib/validations/voluntario"
import { voluntarioToJson } from "@/lib/serializers/voluntario"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Cuerpo JSON inválido" }, { status: 400 })
    }

    const parsed = voluntarioCreateSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Datos inválidos"
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const existing = await prisma.voluntario.findUnique({
      where: { userId: session.user.id },
    })
    if (existing) {
      return NextResponse.json({ error: "Ya tenés un perfil de voluntario registrado" }, { status: 409 })
    }

    const voluntario = await prisma.voluntario.create({
      data: {
        userId: session.user.id,
        whatsapp: parsed.data.whatsapp,
        zona: parsed.data.zona,
        tiposAyuda: parsed.data.tiposAyuda,
        disponibilidad: parsed.data.disponibilidad,
        notificaciones: parsed.data.notificaciones,
      },
    })

    return NextResponse.json(voluntarioToJson(voluntario), { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
