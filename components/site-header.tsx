import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { UserMenu } from "@/components/user-menu"
import { navItems } from "@/lib/nav-items"
import { auth, signOut } from "@/lib/auth"
import { PawPrint } from "lucide-react"

export async function SiteHeader() {
  const session = await auth()

  async function handleSignOut() {
    "use server"
    await signOut({ redirectTo: "/" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-2">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Huellas</span>
        </Link>
        <MobileNav className="ml-auto shrink-0 md:hidden" session={session} />
        <div className="ml-auto flex max-md:hidden items-center gap-4 md:gap-6">
          <nav className="flex gap-4 sm:gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium hover:underline underline-offset-4">
                {item.label}
              </Link>
            ))}
          </nav>
          {session?.user ? (
            <UserMenu
              name={session.user.name ?? null}
              image={session.user.image ?? null}
              role={session.user.role ?? null}
              onSignOut={handleSignOut}
            />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/voluntarios/login">
                <Button variant="outline" size="sm" className="min-h-11">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/voluntarios/registro">
                <Button size="sm" className="min-h-11">Registrarse</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
