import { z } from "zod"

export const tipoAyudaEnum = z.enum(["traslados", "transito", "entrega", "acompanamiento", "difusion"])

export const voluntarioCreateSchema = z.object({
  whatsapp: z.string().min(1, "Ingresá tu WhatsApp"),
  zona: z.enum(["capital", "gba-norte", "gba-sur", "gba-oeste"], {
    required_error: "Seleccioná una zona",
  }),
  tiposAyuda: z.array(tipoAyudaEnum).min(1, "Seleccioná al menos un tipo de ayuda"),
  disponibilidad: z.string().optional(),
  notificaciones: z.boolean().default(false),
})

export type VoluntarioCreateInput = z.infer<typeof voluntarioCreateSchema>
