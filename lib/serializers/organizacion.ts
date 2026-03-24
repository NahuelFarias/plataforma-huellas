import type { Organizacion } from "@prisma/client"
import type { Prisma } from "@prisma/client"
import type { OrganizacionCreateInput, OrganizacionPatchInput } from "@/lib/validations/organizacion"

export type OrganizacionJson = ReturnType<typeof organizacionToJson>

export function organizacionToJson(o: Organizacion) {
  return {
    id: o.id,
    nombre: o.nombre,
    descripcion: o.descripcion,
    zona: o.zona,
    direccion: o.direccion ?? null,
    telefono: o.telefono,
    email: o.email,
    web: o.web ?? null,
    instagram: o.instagram ?? null,
    facebook: o.facebook ?? null,
    logo: o.logo ?? null,
    userId: o.userId,
    createdAt: o.createdAt.toISOString(),
  }
}

export function toPrismaCreate(data: OrganizacionCreateInput, userId: string): Prisma.OrganizacionCreateInput {
  return {
    nombre: data.nombre,
    descripcion: data.descripcion,
    zona: data.zona,
    direccion: data.direccion || undefined,
    telefono: data.telefono,
    email: data.email,
    web: data.web || undefined,
    instagram: data.instagram || undefined,
    facebook: data.facebook || undefined,
    logo: data.logo || undefined,
    user: { connect: { id: userId } },
  }
}

export function toPrismaUpdate(data: OrganizacionPatchInput): Prisma.OrganizacionUpdateInput {
  const u: Prisma.OrganizacionUpdateInput = {}
  if (data.nombre !== undefined) u.nombre = data.nombre
  if (data.descripcion !== undefined) u.descripcion = data.descripcion
  if (data.zona !== undefined) u.zona = data.zona
  if (data.direccion !== undefined) u.direccion = data.direccion || null
  if (data.telefono !== undefined) u.telefono = data.telefono
  if (data.email !== undefined) u.email = data.email
  if (data.web !== undefined) u.web = data.web || null
  if (data.instagram !== undefined) u.instagram = data.instagram || null
  if (data.facebook !== undefined) u.facebook = data.facebook || null
  if (data.logo !== undefined) u.logo = data.logo || null
  return u
}
