"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Car, HomeIcon, Package, UserRound, Share2 } from "lucide-react"

import { voluntarioCreateSchema, type VoluntarioCreateInput } from "@/lib/validations/voluntario"
import type { VoluntarioJson } from "@/lib/serializers/voluntario"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
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

const TIPOS = [
  { id: "traslados", label: "Traslados", icon: Car },
  { id: "transito", label: "Tránsito", icon: HomeIcon },
  { id: "entrega", label: "Entrega de alimentos/medicación", icon: Package },
  { id: "acompanamiento", label: "Acompañamiento a veterinaria", icon: UserRound },
  { id: "difusion", label: "Difusión en redes", icon: Share2 },
] as const

export function RegistroVoluntarioForm() {
  const router = useRouter()
  const { data: session, update } = useSession()
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const form = useForm<VoluntarioCreateInput>({
    resolver: zodResolver(voluntarioCreateSchema),
    defaultValues: {
      whatsapp: "",
      tiposAyuda: [],
      disponibilidad: "",
      notificaciones: false,
    },
  })

  async function onSubmit(values: VoluntarioCreateInput) {
    setSubmitError(null)
    let res: Response
    try {
      res = await fetch("/api/voluntarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
    } catch {
      setSubmitError("No se pudo conectar. Revisá tu conexión o que el servidor esté en marcha.")
      return
    }
    const json = (await res.json().catch(() => ({}))) as VoluntarioJson & { error?: string }
    if (!res.ok) {
      setSubmitError(json.error ?? "No se pudo registrar el perfil.")
      return
    }
    await update({ voluntarioId: json.id })
    router.refresh()
    router.push("/voluntarios/calendario")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {submitError ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {submitError}
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Nombre completo</p>
            <p className="text-sm text-muted-foreground border rounded-md px-3 py-2">
              {session?.user?.name ?? "—"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Correo electrónico</p>
            <p className="text-sm text-muted-foreground border rounded-md px-3 py-2">
              {session?.user?.email ?? "—"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="+54 11 1234-5678" {...field} />
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
                <FormLabel>Zona donde podés ayudar</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="tiposAyuda"
          render={() => (
            <FormItem>
              <FormLabel>Tipos de ayuda que podés brindar</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {TIPOS.map(({ id, label, icon: Icon }) => (
                  <FormField
                    key={id}
                    control={form.control}
                    name="tiposAyuda"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(id)}
                            onCheckedChange={(checked) => {
                              const current = field.value ?? []
                              field.onChange(
                                checked ? [...current, id] : current.filter((v) => v !== id)
                              )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="flex items-center gap-2 font-normal cursor-pointer">
                          <Icon className="h-4 w-4" />
                          {label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disponibilidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disponibilidad</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej: Disponible lunes a viernes de 17 a 20 hs, y fines de semana por la mañana."
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
          name="notificaciones"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Quiero recibir notificaciones de pedidos por WhatsApp
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full min-h-11" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Registrando…" : "Registrarme para ayudar"}
        </Button>
      </form>
    </Form>
  )
}
