import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { pedidoCreateSchema } from "@/lib/validations/pedido"
import { pedidoToJson, toPrismaCreate } from "@/lib/serializers/pedido"

export const runtime = "nodejs"

export async function GET() {
  try {
    const rows = await prisma.pedido.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json({ pedidos: rows.map(pedidoToJson) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
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
    const p = await prisma.pedido.create({ data: toPrismaCreate(parsed.data) })
    return NextResponse.json(pedidoToJson(p), { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
