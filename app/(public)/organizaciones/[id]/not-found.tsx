import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function OrgNotFound() {
  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Organización no encontrada</h1>
        <p className="text-muted-foreground mb-6">
          La organización que buscás no existe o fue eliminada.
        </p>
        <Link href="/voluntarios/pedidos">
          <Button className="min-h-11">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ver pedidos disponibles
          </Button>
        </Link>
      </div>
    </div>
  )
}
