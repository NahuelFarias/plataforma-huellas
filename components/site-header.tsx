import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Huellas</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/voluntarios/pedidos" className="text-sm font-medium hover:underline underline-offset-4">
            Pedidos
          </Link>
          <Link href="/colectas" className="text-sm font-medium hover:underline underline-offset-4">
            Colectas
          </Link>
          <Link href="/faq" className="text-sm font-medium hover:underline underline-offset-4">
            Preguntas frecuentes
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link href="/voluntarios/login">
            <Button variant="outline" size="sm">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/voluntarios/registro">
            <Button size="sm">Registrarse</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
