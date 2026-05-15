import type { Pedido } from "@prisma/client"
import type { Prisma } from "@prisma/client"
import type { PedidoCreateInput, PedidoPatchInput } from "@/lib/validations/pedido"

export type PedidoJson = ReturnType<typeof pedidoToJson>

export function pedidoToJson(p: Pedido) {
  return {
    id: p.id,
    tipo: p.tipo,
    zona: p.zona,
    direccion: p.direccion,
    urgencia: p.urgencia,
    fechaSugerida: p.fechaSugerida ? p.fechaSugerida.toISOString().slice(0, 10) : null,
    horaSugerida: p.horaSugerida ?? null,
    descripcion: p.descripcion,
    contactoNombre: p.contactoNombre,
    contactoTelefono: p.contactoTelefono,
    organizacionId: p.organizacionId ?? null,
  }
}

export function toPrismaCreate(data: PedidoCreateInput): Prisma.PedidoCreateInput {
  const base: Prisma.PedidoCreateInput = {
    tipo: data.tipo,
    zona: data.zona,
    direccion: data.direccion,
    urgencia: data.urgencia,
    descripcion: data.descripcion,
    contactoNombre: data.contactoNombre,
    contactoTelefono: data.contactoTelefono,
  }
  if (data.fechaSugerida !== undefined) {
    base.fechaSugerida =
      data.fechaSugerida === null ? null : new Date(`${data.fechaSugerida}T00:00:00.000Z`)
  }
  if (data.horaSugerida !== undefined) {
    base.horaSugerida = data.horaSugerida
  }
  return base
}

export function toPrismaUpdate(data: PedidoPatchInput): Prisma.PedidoUpdateInput {
  const u: Prisma.PedidoUpdateInput = {}
  if (data.tipo !== undefined) u.tipo = data.tipo
  if (data.zona !== undefined) u.zona = data.zona
  if (data.direccion !== undefined) u.direccion = data.direccion
  if (data.urgencia !== undefined) u.urgencia = data.urgencia
  if (data.descripcion !== undefined) u.descripcion = data.descripcion
  if (data.contactoNombre !== undefined) u.contactoNombre = data.contactoNombre
  if (data.contactoTelefono !== undefined) u.contactoTelefono = data.contactoTelefono
  if (data.fechaSugerida !== undefined) {
    u.fechaSugerida =
      data.fechaSugerida === null ? null : new Date(`${data.fechaSugerida}T00:00:00.000Z`)
  }
  if (data.horaSugerida !== undefined) {
    u.horaSugerida = data.horaSugerida
  }
  return u
}
