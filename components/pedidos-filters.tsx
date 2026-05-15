"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PedidosFiltersProps = {
  zona?: string
  tipo?: string
  urgencia?: string
}

export function PedidosFilters({ zona, tipo, urgencia }: PedidosFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === "todas" || value === "todos" || value === "cualquiera") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      const qs = params.toString()
      router.push(qs ? `?${qs}` : "/voluntarios/pedidos")
    },
    [router, searchParams]
  )

  return (
    <div className="mb-8 p-4 border rounded-lg bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Select value={zona ?? "todas"} onValueChange={(v) => updateFilter("zona", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Todas las zonas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las zonas</SelectItem>
            <SelectItem value="capital">Capital Federal</SelectItem>
            <SelectItem value="gba-norte">GBA Zona Norte</SelectItem>
            <SelectItem value="gba-sur">GBA Zona Sur</SelectItem>
            <SelectItem value="gba-oeste">GBA Zona Oeste</SelectItem>
          </SelectContent>
        </Select>

        <Select value={tipo ?? "todos"} onValueChange={(v) => updateFilter("tipo", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="traslado">Traslados</SelectItem>
            <SelectItem value="transito">Tránsito</SelectItem>
            <SelectItem value="entrega">Entrega de alimentos/medicación</SelectItem>
            <SelectItem value="acompanamiento">Acompañamiento a veterinaria</SelectItem>
            <SelectItem value="difusion">Difusión en redes</SelectItem>
          </SelectContent>
        </Select>

        <Select value={urgencia ?? "cualquiera"} onValueChange={(v) => updateFilter("urgencia", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Cualquier urgencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cualquiera">Cualquier urgencia</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="media">Media</SelectItem>
            <SelectItem value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
