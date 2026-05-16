import { z } from "zod"

const zonaEnum = z.enum(["capital", "gba-norte", "gba-sur", "gba-oeste"], {
  required_error: "Seleccioná una zona",
})

export const organizacionCreateSchema = z.object({
  nombre: z.string().min(1, "Completá el nombre"),
  descripcion: z.string().min(1, "Completá la descripción"),
  zona: zonaEnum,
  direccion: z.string().optional(),
  telefono: z.string().min(1, "Completá el teléfono"),
  email: z.string().email("Ingresá un email válido"),
  web: z.string().url("Ingresá una URL válida").optional().or(z.literal("")),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  logo: z.string().url().optional().or(z.literal("")),
})

export const organizacionPatchSchema = organizacionCreateSchema.partial()

export const organizacionEditSchema = z.object({
  nombre: z.string().min(1, "Completá el nombre"),
  descripcion: z.string().min(1, "Completá la descripción"),
  zona: zonaEnum,
  direccion: z.string().optional(),
  telefono: z.string().min(1, "Completá el teléfono"),
  email: z.string().email("Email inválido"),
  web: z.string().url("Ingresá una URL válida").optional().or(z.literal("")),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
})

export type OrganizacionCreateInput = z.infer<typeof organizacionCreateSchema>
export type OrganizacionPatchInput = z.infer<typeof organizacionPatchSchema>
export type OrganizacionEditInput = z.infer<typeof organizacionEditSchema>
