export const dynamic = "force-dynamic"

import type { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { pedidoToJson } from "@/lib/serializers/pedido"
import { PedidoCard } from "@/components/pedido-card"
import { PedidosFilters } from "@/components/pedidos-filters"

type PageProps = {
  searchParams: Promise<{ zona?: string; tipo?: string; urgencia?: string }>
}

export default async function AvailableRequests({ searchParams }: PageProps) {
  const { zona, tipo, urgencia } = await searchParams

  const where: Prisma.PedidoWhereInput = {}
  if (zona) where.zona = zona
  if (tipo) where.tipo = tipo
  if (urgencia) where.urgencia = urgencia

  const rows = await prisma.pedido.findMany({ where, orderBy: { createdAt: "desc" } })
  const pedidos = rows.map(pedidoToJson)

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pedidos disponibles</h1>
          <p className="text-muted-foreground">Estos son los pedidos que coinciden con tu zona y preferencias</p>
        </div>

        <PedidosFilters zona={zona} tipo={tipo} urgencia={urgencia} />

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
