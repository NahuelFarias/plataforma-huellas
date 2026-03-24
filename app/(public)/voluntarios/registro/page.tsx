import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, HomeIcon, Package, UserRound, Share2, Calendar } from "lucide-react"

export default function VolunteerRegistration() {
  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Registro de Voluntario</h1>
            <p className="text-muted-foreground">Completá tus datos para comenzar a ayudar en el rescate animal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
              <CardDescription>
                Ingresá tus datos de contacto para que las organizaciones puedan comunicarse contigo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input id="nombre" placeholder="Tu nombre y apellido" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" placeholder="+54 11 1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zona">Zona donde puedes ayudar</Label>
                    <Select>
                      <SelectTrigger id="zona">
                        <SelectValue placeholder="Selecciona una zona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="capital">Capital Federal</SelectItem>
                        <SelectItem value="gba-norte">GBA Zona Norte</SelectItem>
                        <SelectItem value="gba-sur">GBA Zona Sur</SelectItem>
                        <SelectItem value="gba-oeste">GBA Zona Oeste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Tipos de ayuda que puedes brindar</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="traslados" />
                      <Label htmlFor="traslados" className="flex items-center gap-2 font-normal">
                        <Car className="h-4 w-4" /> Traslados
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="transito" />
                      <Label htmlFor="transito" className="flex items-center gap-2 font-normal">
                        <HomeIcon className="h-4 w-4" /> Tránsito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="entrega" />
                      <Label htmlFor="entrega" className="flex items-center gap-2 font-normal">
                        <Package className="h-4 w-4" /> Entrega de alimentos/medicación
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="acompanamiento" />
                      <Label htmlFor="acompanamiento" className="flex items-center gap-2 font-normal">
                        <UserRound className="h-4 w-4" /> Acompañamiento a veterinaria
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="difusion" />
                      <Label htmlFor="difusion" className="flex items-center gap-2 font-normal">
                        <Share2 className="h-4 w-4" /> Difusión en redes
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="disponibilidad">Disponibilidad</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Configurar calendario
                    </Link>
                  </div>
                  <Textarea
                    id="disponibilidad"
                    placeholder="Ejemplo: Disponible lunes a viernes de 17 a 20 hs, y fines de semana por la mañana."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="notificaciones" />
                  <Label htmlFor="notificaciones" className="font-normal">
                    Quiero recibir notificaciones de pedidos por WhatsApp
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Registrarme para ayudar
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Al registrarte, aceptas nuestros{" "}
                <Link href="/terminos" className="text-primary hover:underline">
                  Términos y Condiciones
                </Link>{" "}
                y{" "}
                <Link href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
                .
              </p>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/voluntarios/login" className="text-primary hover:underline">
                    Iniciar sesión
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
