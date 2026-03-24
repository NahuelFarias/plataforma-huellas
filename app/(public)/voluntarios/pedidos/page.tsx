export const dynamic = "force-dynamic"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { pedidoToJson } from "@/lib/serializers/pedido"
import { PedidoCard } from "@/components/pedido-card"

export default async function AvailableRequests() {
  const rows = await prisma.pedido.findMany({ orderBy: { createdAt: "desc" } })
  const pedidos = rows.map(pedidoToJson)

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pedidos disponibles</h1>
          <p className="text-muted-foreground">Estos son los pedidos que coinciden con tu zona y preferencias</p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-4 border rounded-lg bg-background">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Select>
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

              <Select>
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

              <Select>
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

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cualquiera">Cualquier fecha</SelectItem>
                  <SelectItem value="hoy">Hoy</SelectItem>
                  <SelectItem value="manana">Mañana</SelectItem>
                  <SelectItem value="semana">Esta semana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button className="w-full md:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {pedidos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedidos.map((pedido) => (
              <PedidoCard key={pedido.id} pedido={pedido} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No hay pedidos disponibles en este momento.</p>
            <p className="text-muted-foreground mt-2">Volvé a intentar más tarde o cambiá los filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
