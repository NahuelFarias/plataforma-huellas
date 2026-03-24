"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { respuestaCreateSchema } from "@/lib/validations/respuesta"

export type RespuestaFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

function isValidObjectId(id: string) {
  return /^[a-fA-F0-9]{24}$/.test(id)
}

export async function crearRespuesta(
  prevState: RespuestaFormState,
  formData: FormData
): Promise<RespuestaFormState> {
  const pedidoId = formData.get("pedidoId") as string

  if (!pedidoId || !isValidObjectId(pedidoId)) {
    return { success: false, error: "Pedido inválido" }
  }

  const honeypot = formData.get("_hp") as string
  if (honeypot && honeypot.length > 0) {
    return { success: true }
  }

  const hdrs = await headers()
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) {
    return { success: false, error: "Demasiados envíos. Intentá de nuevo en unos minutos." }
  }

  const raw = {
    nombre: formData.get("nombre"),
    whatsapp: formData.get("whatsapp"),
    mensaje: formData.get("mensaje"),
    _hp: honeypot ?? "",
  }

  const parsed = respuestaCreateSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString()
      if (key) fieldErrors[key] = issue.message
    }
    return { success: false, fieldErrors }
  }

  const pedido = await prisma.pedido.findUnique({ where: { id: pedidoId } })
  if (!pedido) {
    return { success: false, error: "El pedido no existe" }
  }

  const session = await auth()
  const userId = session?.user?.id ?? null

  await prisma.pedidoRespuesta.create({
    data: {
      pedidoId,
      userId,
      nombre: parsed.data.nombre,
      whatsapp: parsed.data.whatsapp,
      mensaje: parsed.data.mensaje,
      ip,
    },
  })

  revalidatePath(`/voluntarios/pedidos/${pedidoId}`)
  return { success: true }
}
