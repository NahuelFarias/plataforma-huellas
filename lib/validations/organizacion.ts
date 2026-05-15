import { z } from "zod"

const zonaEnum = z.enum(["capital", "gba-norte", "gba-sur", "gba-oeste"])

export const organizacionCreateSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
  zona: zonaEnum,
  direccion: z.string().optional(),
  telefono: z.string().min(1),
  email: z.string().email(),
  web: z.string().url().optional().or(z.literal("")),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  logo: z.string().url().optional().or(z.literal("")),
})

export const organizacionPatchSchema = organizacionCreateSchema.partial()

export type OrganizacionCreateInput = z.infer<typeof organizacionCreateSchema>
export type OrganizacionPatchInput = z.infer<typeof organizacionPatchSchema>
