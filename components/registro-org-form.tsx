"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const registroOrgSchema = z.object({
  nombre: z.string().min(1, "Completá el nombre"),
  descripcion: z.string().min(1, "Completá la descripción"),
  zona: z.string().optional(),
  direccion: z.string().optional(),
  telefono: z.string().min(1, "Completá el teléfono"),
  email: z.string().email("Ingresá un email válido"),
  web: z.string().url("Ingresá una URL válida").optional().or(z.literal("")),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.zona) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Seleccioná una zona",
      path: ["zona"],
    })
  }
})

type RegistroOrgValues = z.infer<typeof registroOrgSchema>

export function RegistroOrgForm() {
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const form = useForm<RegistroOrgValues>({
    resolver: zodResolver(registroOrgSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      direccion: "",
      telefono: "",
      email: "",
      web: "",
      instagram: "",
      facebook: "",
    },
  })

  async function onSubmit(values: RegistroOrgValues) {
    setSubmitError(null)
    let res: Response
    try {
      res = await fetch("/api/organizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
    } catch {
      setSubmitError("No se pudo conectar. Revisá tu conexión o que el servidor esté en marcha.")
      return
    }
    const json = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) {
      setSubmitError(json.error ?? "No se pudo registrar la organización.")
      return
    }
    await fetch("/api/auth/session")
    window.location.href = "/organizaciones/perfil"
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {submitError ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {submitError}
          </p>
        ) : null}

        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la organización</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Patitas Felices" {...field} />
              </FormControl>
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
              <FormControl>
                <Textarea
                  placeholder="Contanos sobre la organización, su misión y actividades..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná una zona" />
                  </SelectTrigger>
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
              <FormControl>
                <Input placeholder="Ej: Av. Corrientes 1234, CABA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono de contacto</FormLabel>
                <FormControl>
                  <Input placeholder="+54 11 1234-5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email de contacto</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contacto@ejemplo.org" {...field} />
                </FormControl>
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
              <FormControl>
                <Input placeholder="https://www.ejemplo.org" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="@mi_organizacion" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="facebook.com/mi_organizacion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Registrando…" : "Registrar organización"}
        </Button>
      </form>
    </Form>
  )
}
