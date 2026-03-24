import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { pedidoToJson } from "@/lib/serializers/pedido"
import { tipoLabels, tipoIcons, zonaLabels, urgenciaBadgeVariant, urgenciaLabel } from "@/lib/pedido-display"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, ArrowLeft, Phone, User } from "lucide-react"
import { RespuestaForm } from "@/components/respuesta-form"

function isValidObjectId(id: string) {
  return /^[a-fA-F0-9]{24}$/.test(id)
}

export default async function PedidoDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!isValidObjectId(id)) notFound()

  const raw = await prisma.pedido.findUnique({ where: { id } })
  if (!raw) notFound()

  const pedido = pedidoToJson(raw)
  const session = await auth()

  const Icon = tipoIcons[pedido.tipo]
  const badgeVariant = urgenciaBadgeVariant(pedido.urgencia)

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <Link href="/voluntarios/pedidos">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a pedidos
          </Button>
        </Link>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={badgeVariant}>{urgenciaLabel(pedido.urgencia)}</Badge>
              {pedido.fechaSugerida && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{pedido.fechaSugerida}</span>
                  {pedido.horaSugerida && <span className="ml-1">({pedido.horaSugerida})</span>}
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              {Icon && <Icon className="h-7 w-7" />}
              {tipoLabels[pedido.tipo] ?? pedido.tipo}
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detalle del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{zonaLabels[pedido.zona] ?? pedido.zona}{pedido.direccion ? `, ${pedido.direccion}` : ""}</span>
              </div>
              <p className="text-base leading-relaxed">{pedido.descripcion}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto de la organización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{pedido.contactoNombre}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{pedido.contactoTelefono}</span>
              </div>
            </CardContent>
          </Card>

          <RespuestaForm pedidoId={pedido.id} userName={session?.user?.name} />
        </div>
      </div>
    </div>
  )
}
