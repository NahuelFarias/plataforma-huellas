import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistroVoluntarioForm } from "@/components/registro-voluntario-form"

export const metadata = {
  title: "Registro de voluntario | Huellas",
  description: "Completá tu perfil para comenzar a ayudar en el rescate animal.",
}

export default async function VolunteerRegistration() {
  const session = await auth()
  if (session?.user?.voluntarioId) {
    redirect("/voluntarios/calendario")
  }

  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Registro de voluntario</h1>
            <p className="text-muted-foreground">Completá tus datos para comenzar a ayudar en el rescate animal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
              <CardDescription>
                Ingresá tus datos de contacto para que las organizaciones puedan comunicarse con vos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegistroVoluntarioForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Al registrarte, aceptás nuestros{" "}
                <Link href="/terminos" className="text-primary hover:underline">
                  Términos y Condiciones
                </Link>{" "}
                y{" "}
                <Link href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
