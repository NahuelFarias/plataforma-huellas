import { z } from "zod"

export const respuestaCreateSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  whatsapp: z.string().regex(/^\+?54\d{10,11}$/, "Ingresá un número de WhatsApp válido (ej: 5411XXXXXXXX)"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(500),
  _hp: z.string().max(0).optional(),
})

export type RespuestaCreateInput = z.infer<typeof respuestaCreateSchema>
