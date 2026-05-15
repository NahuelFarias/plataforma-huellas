import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Building2 } from "lucide-react"
import type { PedidoJson } from "@/lib/serializers/pedido"
import { tipoLabels, tipoIcons, zonaLabels, urgenciaBadgeVariant, urgenciaLabel } from "@/lib/pedido-display"

type PedidoCardProps = {
  pedido: PedidoJson
  imageSrc?: string
  showImage?: boolean
}

export function PedidoCard({ pedido, imageSrc, showImage = false }: PedidoCardProps) {
  const Icon = tipoIcons[pedido.tipo]
  const badgeVariant = urgenciaBadgeVariant(pedido.urgencia)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant={badgeVariant} className="mb-2">
            {urgenciaLabel(pedido.urgencia)}
          </Badge>
          {pedido.fechaSugerida && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>{pedido.fechaSugerida}</span>
            </div>
          )}
        </div>
        {showImage && imageSrc && (
          <div className="relative h-40 w-full rounded-md overflow-hidden mb-2">
            <Image
              src={imageSrc}
              alt={tipoLabels[pedido.tipo] ?? pedido.tipo}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {tipoLabels[pedido.tipo] ?? pedido.tipo}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {zonaLabels[pedido.zona] ?? pedido.zona}{pedido.direccion ? `, ${pedido.direccion}` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{pedido.descripcion}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/voluntarios/pedidos/${pedido.id}`} className="flex-1">
          <Button className="w-full min-h-11">Quiero ayudar</Button>
        </Link>
        {pedido.organizacionId && (
          <Link href={`/organizaciones/${pedido.organizacionId}`}>
            <Button variant="outline" size="icon" className="min-h-11 min-w-11" title="Ver organización">
              <Building2 className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
