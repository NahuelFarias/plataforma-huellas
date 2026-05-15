"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { organizacionEditSchema, type OrganizacionEditInput } from "@/lib/validations/organizacion"
import type { OrganizacionJson } from "@/lib/serializers/organizacion"

export function EditarPerfilOrgDialog({ org }: { org: OrganizacionJson }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const form = useForm<OrganizacionEditInput>({
    resolver: zodResolver(organizacionEditSchema),
    defaultValues: {
      nombre: org.nombre,
      descripcion: org.descripcion,
      zona: org.zona as OrganizacionEditInput["zona"],
      direccion: org.direccion ?? "",
      telefono: org.telefono,
      email: org.email,
      web: org.web ?? "",
      instagram: org.instagram ?? "",
      facebook: org.facebook ?? "",
    },
  })

  async function onSubmit(values: OrganizacionEditInput) {
    setSubmitError(null)
    let res: Response
    try {
      res = await fetch(`/api/organizaciones/${org.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
    } catch {
      setSubmitError("No se pudo conectar. Revisá tu conexión.")
      return
    }
    const json = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) {
      setSubmitError(json.error ?? "No se pudo actualizar el perfil.")
      return
    }
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full min-h-11">
          <Edit className="h-4 w-4 mr-2" />
          Editar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Actualizá los datos de tu organización</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {submitError && (
              <p className="text-sm font-medium text-destructive" role="alert">{submitError}</p>
            )}

            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl><Textarea className="min-h-[80px]" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zona principal</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="capital">Capital Federal</SelectItem>
                      <SelectItem value="gba-norte">GBA Zona Norte</SelectItem>
                      <SelectItem value="gba-sur">GBA Zona Sur</SelectItem>
                      <SelectItem value="gba-oeste">GBA Zona Oeste</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección (opcional)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="web"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sitio web (opcional)</FormLabel>
                  <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram (opcional)</FormLabel>
                    <FormControl><Input placeholder="@usuario" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook (opcional)</FormLabel>
                    <FormControl><Input placeholder="facebook.com/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="min-h-11" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Guardando…" : "Guardar cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
