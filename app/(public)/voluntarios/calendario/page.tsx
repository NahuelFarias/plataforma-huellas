import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"

export default function VolunteerCalendar() {
  return (
    <div className="py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Mi calendario de disponibilidad</h1>
            <p className="text-muted-foreground">Configurá cuándo estás disponible para ayudar</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="calendar" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calendar">Calendario</TabsTrigger>
                  <TabsTrigger value="weekly">Horarios semanales</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendario mensual</CardTitle>
                      <CardDescription>Seleccioná los días en los que no estás disponible</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar mode="multiple" className="rounded-md border" />
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>* Los días seleccionados se marcarán como no disponibles</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Limpiar selección</Button>
                      <Button>Guardar cambios</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="weekly" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Horarios semanales</CardTitle>
                      <CardDescription>Configurá tu disponibilidad para cada día de la semana</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                          <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b">
                            <div className="w-28 font-medium">{day}</div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox id={`${day.toLowerCase()}-morning`} />
                                <Label htmlFor={`${day.toLowerCase()}-morning`} className="font-normal">
                                  Mañana (8:00 - 12:00)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id={`${day.toLowerCase()}-afternoon`} />
                                <Label htmlFor={`${day.toLowerCase()}-afternoon`} className="font-normal">
                                  Tarde (12:00 - 18:00)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id={`${day.toLowerCase()}-evening`} />
                                <Label htmlFor={`${day.toLowerCase()}-evening`} className="font-normal">
                                  Noche (18:00 - 22:00)
                                </Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Restablecer</Button>
                      <Button>Guardar cambios</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de notificaciones</CardTitle>
                  <CardDescription>Personaliza cómo quieres recibir alertas de pedidos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Recibir notificaciones por</Label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-email" defaultChecked />
                          <Label htmlFor="notify-email" className="font-normal">
                            Correo electrónico
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-whatsapp" defaultChecked />
                          <Label htmlFor="notify-whatsapp" className="font-normal">
                            WhatsApp
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Frecuencia de notificaciones</Label>
                      <Select defaultValue="instant">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona frecuencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instant">Inmediatamente</SelectItem>
                          <SelectItem value="daily">Resumen diario</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tipos de pedidos a notificar</Label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-urgent" defaultChecked />
                          <Label htmlFor="notify-urgent" className="font-normal">
                            Solo pedidos urgentes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notify-all" />
                          <Label htmlFor="notify-all" className="font-normal">
                            Todos los pedidos
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Guardar preferencias</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Mis próximos compromisos</CardTitle>
                  <CardDescription>Pedidos que has aceptado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary h-5 w-5"
                        >
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                          <circle cx="6.5" cy="17.5" r="2.5" />
                          <circle cx="16.5" cy="17.5" r="2.5" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Traslado a veterinaria</h4>
                        <p className="text-sm text-muted-foreground">Mañana, 15:00 hs</p>
                        <p className="text-sm text-muted-foreground">Palermo → Belgrano</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary h-5 w-5"
                        >
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                          <path d="M12 9v4" />
                          <path d="M12 17h.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Entrega de medicación</h4>
                        <p className="text-sm text-muted-foreground">Jueves, 18:00 hs</p>
                        <p className="text-sm text-muted-foreground">Caballito</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/voluntarios/mis-pedidos" className="w-full">
                    <Button variant="outline" className="w-full">
                      Ver todos mis compromisos
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
    </div>
  )
}
