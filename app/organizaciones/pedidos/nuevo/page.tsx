import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NuevoPedidoForm } from "@/components/nuevo-pedido-form"

export default function NewRequest() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Publicar nuevo pedido</h1>
              <p className="text-muted-foreground">Completá los datos para solicitar ayuda de voluntarios</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detalles del pedido</CardTitle>
                <CardDescription>
                  Proporcioná información clara para que los voluntarios puedan ayudarte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NuevoPedidoForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
