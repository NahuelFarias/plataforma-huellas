import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { organizacionPatchSchema } from "@/lib/validations/organizacion"
import { organizacionToJson, toPrismaUpdate } from "@/lib/serializers/organizacion"

export const runtime = "nodejs"

function isValidObjectId(id: string) {
  return /^[a-fA-F0-9]{24}$/.test(id)
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Id inválido" }, { status: 400 })
    }
    const org = await prisma.organizacion.findUnique({ where: { id } })
    if (!org) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
    return NextResponse.json(organizacionToJson(org))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { id } = await context.params
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Id inválido" }, { status: 400 })
    }

    const existing = await prisma.organizacion.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
    if (existing.userId !== session.user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Cuerpo JSON inválido" }, { status: 400 })
    }
    const parsed = organizacionPatchSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Datos inválidos"
      return NextResponse.json({ error: msg }, { status: 400 })
    }
    const updateData = toPrismaUpdate(parsed.data)
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Sin campos para actualizar" }, { status: 400 })
    }
    const org = await prisma.organizacion.update({ where: { id }, data: updateData })
    return NextResponse.json(organizacionToJson(org))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
