"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, parse } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  pedidoFormSchema,
  pedidoFormToCreateInput,
} from "@/lib/validations/pedido"
import type { z } from "zod"
import { cn } from "@/lib/utils"

export function NuevoPedidoForm() {
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [successId, setSuccessId] = React.useState<string | null>(null)
  const [calOpen, setCalOpen] = React.useState(false)

  const form = useForm<z.infer<typeof pedidoFormSchema>>({
    resolver: zodResolver(pedidoFormSchema),
    defaultValues: {
      direccion: "",
      urgencia: "media",
      descripcion: "",
      contactoNombre: "",
      contactoTelefono: "",
    },
  })

  async function onSubmit(values: z.infer<typeof pedidoFormSchema>) {
    setSubmitError(null)
    setSuccessId(null)
    const data = pedidoFormToCreateInput(values)
    let res: Response
    try {
      res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch {
      setSubmitError("No se pudo conectar. Revisá tu conexión o que el servidor esté en marcha.")
      return
    }
    const json = (await res.json().catch(() => ({}))) as { error?: string; id?: string }
    if (!res.ok) {
      setSubmitError(json.error ?? "No se pudo publicar el pedido.")
      return
    }
    if (json.id) setSuccessId(json.id)
    form.reset({
      tipo: undefined,
      zona: undefined,
      direccion: "",
      urgencia: "media",
      fechaSugerida: undefined,
      horaSugerida: undefined,
      descripcion: "",
      contactoNombre: "",
      contactoTelefono: "",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {submitError ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {submitError}
          </p>
        ) : null}
        {successId ? (
          <div className="rounded-lg border border-green-600/40 bg-green-50 p-4 text-sm text-green-900 dark:bg-green-950/40 dark:text-green-100">
            <p className="font-medium">Pedido publicado correctamente.</p>
            <p className="mt-1 text-muted-foreground dark:text-green-200/90">
              Los voluntarios podrán verlo en el listado de pedidos disponibles.
            </p>
            <Button asChild variant="link" className="mt-2 h-auto p-0 text-green-800 dark:text-green-100">
              <Link href="/voluntarios/pedidos">Ver pedidos disponibles</Link>
            </Button>
          </div>
        ) : null}

        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de ayuda</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecciona el tipo de ayuda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="traslado">Traslado</SelectItem>
                  <SelectItem value="transito">Tránsito</SelectItem>
                  <SelectItem value="entrega">Entrega de alimentos/medicación</SelectItem>
                  <SelectItem value="acompanamiento">Acompañamiento a veterinaria</SelectItem>
                  <SelectItem value="difusion">Difusión en redes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zona"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zona</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="zona">
                    <SelectValue placeholder="Selecciona una zona" />
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
              <FormLabel htmlFor="direccion">Dirección específica</FormLabel>
              <FormControl>
                <Input id="direccion" placeholder="Ej: Av. Corrientes 1234, Palermo" {...field} />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Esta información solo será visible para los voluntarios que acepten el pedido
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="urgencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel de urgencia</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="baja" id="baja" />
                    <Label htmlFor="baja" className="font-normal">
                      Baja
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="media" id="media" />
                    <Label htmlFor="media" className="font-normal">
                      Media
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alta" id="alta" />
                    <Label htmlFor="alta" className="font-normal">
                      Alta
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fechaSugerida"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Fecha sugerida</FormLabel>
                <Popover open={calOpen} onOpenChange={setCalOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(parse(field.value, "yyyy-MM-dd", new Date()), "PPP", { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                      selected={field.value ? parse(field.value, "yyyy-MM-dd", new Date()) : undefined}
                      onSelect={(d) => {
                        field.onChange(d ? format(d, "yyyy-MM-dd") : "")
                        setCalOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="horaSugerida"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="hora">Hora sugerida</FormLabel>
                <Select
                  onValueChange={(v) => field.onChange(v === "__sin__" ? "" : v)}
                  value={field.value && field.value.length > 0 ? field.value : "__sin__"}
                >
                  <FormControl>
                    <SelectTrigger id="hora">
                      <SelectValue placeholder="Seleccionar hora" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="__sin__">Sin preferencia</SelectItem>
                    <SelectItem value="manana">Mañana (8:00 - 12:00)</SelectItem>
                    <SelectItem value="mediodia">Mediodía (12:00 - 14:00)</SelectItem>
                    <SelectItem value="tarde">Tarde (14:00 - 18:00)</SelectItem>
                    <SelectItem value="noche">Noche (18:00 - 21:00)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="descripcion">Descripción del pedido</FormLabel>
              <FormControl>
                <Textarea
                  id="descripcion"
                  placeholder="Describe con detalle qué tipo de ayuda necesitas..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label className="text-base">Datos de contacto</Label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contactoNombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contacto-nombre">Nombre de contacto</FormLabel>
                  <FormControl>
                    <Input id="contacto-nombre" placeholder="Nombre y apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactoTelefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contacto-telefono">Teléfono de contacto</FormLabel>
                  <FormControl>
                    <Input id="contacto-telefono" placeholder="+54 11 1234-5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Estos datos serán visibles solo para los voluntarios que acepten el pedido
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Publicando…" : "Publicar pedido"}
        </Button>
      </form>
    </Form>
  )
}
