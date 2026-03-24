"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems } from "@/lib/nav-items"
import { cn } from "@/lib/utils"

type MobileNavProps = {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11 shrink-0"
            type="button"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Menú</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-1 flex-col gap-1 py-4">
            {navItems.map((item) => (
              <SheetClose key={item.href} asChild>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium hover:bg-accent"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t pt-4">
            <SheetClose asChild>
              <Button variant="outline" className="w-full min-h-11" asChild>
                <Link href="/voluntarios/login">Iniciar sesión</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="w-full min-h-11" asChild>
                <Link href="/voluntarios/registro">Registrarse</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
