import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { pedidoPatchSchema } from "@/lib/validations/pedido"
import { pedidoToJson, toPrismaUpdate } from "@/lib/serializers/pedido"

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
    const p = await prisma.pedido.findUnique({ where: { id } })
    if (!p) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
    return NextResponse.json(pedidoToJson(p))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Id inválido" }, { status: 400 })
    }
    const existing = await prisma.pedido.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 })

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Cuerpo JSON inválido" }, { status: 400 })
    }
    const parsed = pedidoPatchSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Datos inválidos"
      return NextResponse.json({ error: msg }, { status: 400 })
    }
    const updateData = toPrismaUpdate(parsed.data)
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Sin campos para actualizar" }, { status: 400 })
    }
    const p = await prisma.pedido.update({ where: { id }, data: updateData })
    return NextResponse.json(pedidoToJson(p))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Id inválido" }, { status: 400 })
    }
    const r = await prisma.pedido.deleteMany({ where: { id } })
    if (r.count === 0) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
