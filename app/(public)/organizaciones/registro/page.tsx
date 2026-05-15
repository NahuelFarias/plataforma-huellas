import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistroOrgForm } from "@/components/registro-org-form"

export default function RegistroOrganizacion() {
  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Registrar organización</h1>
            <p className="text-muted-foreground">
              Completá los datos de tu organización para empezar a publicar pedidos y conectar con voluntarios
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Datos de la organización</CardTitle>
              <CardDescription>
                Esta información será visible en el perfil público de tu organización
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegistroOrgForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
