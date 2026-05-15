import type { PedidoRespuesta } from "@prisma/client"

export type RespuestaJson = ReturnType<typeof respuestaToJson>

export function respuestaToJson(r: PedidoRespuesta) {
  return {
    id: r.id,
    pedidoId: r.pedidoId,
    userId: r.userId,
    nombre: r.nombre,
    whatsapp: r.whatsapp,
    mensaje: r.mensaje,
    createdAt: r.createdAt.toISOString(),
  }
}
