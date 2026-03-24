import Link from "next/link"
import { PawPrint } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-start justify-between gap-4 md:h-24 md:flex-row md:items-center">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <Link href="/" className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-primary" />
            <span className="font-bold">Huellas</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Plataforma Huellas. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terminos" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Términos
          </Link>
          <Link href="/privacidad" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacidad
          </Link>
          <Link href="/contacto" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
