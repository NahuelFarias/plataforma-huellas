import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PedidoNotFound() {
  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Pedido no encontrado</h1>
        <p className="text-muted-foreground mb-6">
          El pedido que buscás no existe o fue eliminado.
        </p>
        <Link href="/voluntarios/pedidos">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ver pedidos disponibles
          </Button>
        </Link>
      </div>
    </div>
  )
}
