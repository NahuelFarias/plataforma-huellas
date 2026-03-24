import { z } from "zod"

const tipoPedido = z.enum(["traslado", "transito", "entrega", "acompanamiento", "difusion"])
const zonaPedido = z.enum(["capital", "gba-norte", "gba-sur", "gba-oeste"])
const urgenciaPedido = z.enum(["baja", "media", "alta"])
const horaSugeridaEnum = z.enum(["manana", "mediodia", "tarde", "noche"])

const fechaSugeridaField = z
  .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.null()])
  .optional()

export const pedidoCreateSchema = z.object({
  tipo: tipoPedido,
  zona: zonaPedido,
  direccion: z.string().min(1),
  urgencia: urgenciaPedido,
  fechaSugerida: fechaSugeridaField,
  horaSugerida: z.union([horaSugeridaEnum, z.null()]).optional(),
  descripcion: z.string().min(1),
  contactoNombre: z.string().min(1),
  contactoTelefono: z.string().min(1),
})

export const pedidoPatchSchema = pedidoCreateSchema.partial()

export type PedidoCreateInput = z.infer<typeof pedidoCreateSchema>
export type PedidoPatchInput = z.infer<typeof pedidoPatchSchema>

export const pedidoFormSchema = z
  .object({
    tipo: tipoPedido.optional(),
    zona: zonaPedido.optional(),
    direccion: z.string().min(1, "Completá la dirección"),
    urgencia: urgenciaPedido,
    fechaSugerida: z
      .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("")])
      .optional(),
    horaSugerida: z.union([horaSugeridaEnum, z.literal("")]).optional(),
    descripcion: z.string().min(1, "Completá la descripción"),
    contactoNombre: z.string().min(1, "Completá el nombre"),
    contactoTelefono: z.string().min(1, "Completá el teléfono"),
  })
  .superRefine((data, ctx) => {
    if (!data.tipo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Seleccioná el tipo de ayuda",
        path: ["tipo"],
      })
    }
    if (!data.zona) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Seleccioná una zona",
        path: ["zona"],
      })
    }
  })

export type PedidoFormValues = z.infer<typeof pedidoFormSchema>

export function pedidoFormToCreateInput(data: PedidoFormValues): PedidoCreateInput {
  const fecha =
    data.fechaSugerida && data.fechaSugerida !== ""
      ? data.fechaSugerida
      : undefined
  const hora =
    data.horaSugerida && data.horaSugerida.length > 0 ? data.horaSugerida : undefined
  return {
    tipo: data.tipo!,
    zona: data.zona!,
    direccion: data.direccion,
    urgencia: data.urgencia,
    fechaSugerida: fecha,
    horaSugerida: hora,
    descripcion: data.descripcion,
    contactoNombre: data.contactoNombre,
    contactoTelefono: data.contactoTelefono,
  }
}
