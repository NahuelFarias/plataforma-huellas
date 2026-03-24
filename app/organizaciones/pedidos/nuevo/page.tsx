import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
                <form className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="tipo">Tipo de ayuda</Label>
                    <Select>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecciona el tipo de ayuda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traslado">Traslado</SelectItem>
                        <SelectItem value="transito">Tránsito</SelectItem>
                        <SelectItem value="entrega">Entrega de alimentos/medicación</SelectItem>
                        <SelectItem value="acompanamiento">Acompañamiento a veterinaria</SelectItem>
                        <SelectItem value="difusion">Difusión en redes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="zona">Zona</Label>
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

                  <div className="space-y-3">
                    <Label htmlFor="direccion">Dirección específica</Label>
                    <Input id="direccion" placeholder="Ej: Av. Corrientes 1234, Palermo" />
                    <p className="text-xs text-muted-foreground">
                      Esta información solo será visible para los voluntarios que acepten el pedido
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Nivel de urgencia</Label>
                    <RadioGroup defaultValue="media">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="baja" id="baja" />
                        <Label htmlFor="baja" className="font-normal">
                          Baja
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="media" id="media" />
                        <Label htmlFor="media" className="font-normal">
                          Media
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="alta" id="alta" />
                        <Label htmlFor="alta" className="font-normal">
                          Alta
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Fecha sugerida</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Seleccionar fecha</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="hora">Hora sugerida</Label>
                      <Select>
                        <SelectTrigger id="hora">
                          <SelectValue placeholder="Seleccionar hora" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manana">Mañana (8:00 - 12:00)</SelectItem>
                          <SelectItem value="mediodia">Mediodía (12:00 - 14:00)</SelectItem>
                          <SelectItem value="tarde">Tarde (14:00 - 18:00)</SelectItem>
                          <SelectItem value="noche">Noche (18:00 - 21:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="descripcion">Descripción del pedido</Label>
                    <Textarea
                      id="descripcion"
                      placeholder="Describe con detalle qué tipo de ayuda necesitas..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Datos de contacto</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contacto-nombre">Nombre de contacto</Label>
                        <Input id="contacto-nombre" placeholder="Nombre y apellido" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contacto-telefono">Teléfono de contacto</Label>
                        <Input id="contacto-telefono" placeholder="+54 11 1234-5678" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Estos datos serán visibles solo para los voluntarios que acepten el pedido
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Publicar pedido
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
