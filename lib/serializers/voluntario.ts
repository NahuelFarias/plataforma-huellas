import type { Voluntario } from "@prisma/client"

export type VoluntarioJson = ReturnType<typeof voluntarioToJson>

export function voluntarioToJson(v: Voluntario) {
  return {
    id: v.id,
    userId: v.userId,
    whatsapp: v.whatsapp,
    zona: v.zona,
    tiposAyuda: v.tiposAyuda,
    disponibilidad: v.disponibilidad ?? null,
    notificaciones: v.notificaciones,
    createdAt: v.createdAt.toISOString(),
  }
}
