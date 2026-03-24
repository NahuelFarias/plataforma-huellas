import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { pedidoCreateSchema } from "@/lib/validations/pedido"
import { pedidoToJson, toPrismaCreate } from "@/lib/serializers/pedido"
import type { Prisma } from "@prisma/client"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const organizacionId = searchParams.get("organizacionId")
    const where: Prisma.PedidoWhereInput = {}
    if (organizacionId) where.organizacionId = organizacionId
    const rows = await prisma.pedido.findMany({ where, orderBy: { createdAt: "desc" } })
    return NextResponse.json({ pedidos: rows.map(pedidoToJson) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

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
    const parsed = pedidoCreateSchema.safeParse(body)
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Datos inválidos"
      return NextResponse.json({ error: msg }, { status: 400 })
    }
    const data = toPrismaCreate(parsed.data)
    if (session.user.role === "organizacion" && session.user.organizacionId) {
      data.organizacion = { connect: { id: session.user.organizacionId } }
    }
    const p = await prisma.pedido.create({ data })
    return NextResponse.json(pedidoToJson(p), { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
