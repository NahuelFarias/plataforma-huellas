import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Heart, Clock } from "lucide-react"

export default function Fundraisers() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Colectas activas</h1>
            <p className="text-muted-foreground">
              Ayudá a financiar tratamientos, alimentos y otros gastos para animales rescatados
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="urgent">Urgentes</TabsTrigger>
              <TabsTrigger value="medical">Tratamientos</TabsTrigger>
              <TabsTrigger value="food">Alimentos</TabsTrigger>
              <TabsTrigger value="transport">Traslados</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Fundraiser Card 1 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="destructive" className="mb-2">
                        Urgente
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>5 días restantes</span>
                      </div>
                    </div>
                    <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                        alt="Perro rescatado"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle>Cirugía urgente para Toby</CardTitle>
                    <CardDescription>
                      Toby necesita una cirugía de urgencia tras ser atropellado. Ayudanos a cubrir los gastos
                      veterinarios.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Recaudado: $45.000</span>
                        <span className="text-muted-foreground">Meta: $60.000</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">75% completado</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Donar con MercadoPago
                    </Button>
                  </CardFooter>
                </Card>

                {/* Fundraiser Card 2 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="mb-2">
                        Tratamiento
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>12 días restantes</span>
                      </div>
                    </div>
                    <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80"
                        alt="Gato rescatado"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle>Tratamiento para Michi</CardTitle>
                    <CardDescription>
                      Michi necesita un tratamiento para una infección respiratoria. Ayudanos a cubrir los medicamentos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Recaudado: $12.000</span>
                        <span className="text-muted-foreground">Meta: $20.000</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">60% completado</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Donar con MercadoPago
                    </Button>
                  </CardFooter>
                </Card>

                {/* Fundraiser Card 3 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        Alimentos
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>20 días restantes</span>
                      </div>
                    </div>
                    <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80"
                        alt="Perros rescatados"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle>Alimento para refugio</CardTitle>
                    <CardDescription>
                      Necesitamos comprar alimento para 15 perros rescatados que están en nuestro refugio temporal.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Recaudado: $18.000</span>
                        <span className="text-muted-foreground">Meta: $30.000</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">60% completado</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Donar con MercadoPago
                    </Button>
                  </CardFooter>
                </Card>

                {/* Fundraiser Card 4 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="destructive" className="mb-2">
                        Urgente
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>3 días restantes</span>
                      </div>
                    </div>
                    <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
                        alt="Perro con fractura"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle>Radiografías para Luna</CardTitle>
                    <CardDescription>
                      Luna necesita radiografías para determinar si tiene una fractura en la pata. Ayudanos a cubrir los
                      estudios.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Recaudado: $8.000</span>
                        <span className="text-muted-foreground">Meta: $15.000</span>
                      </div>
                      <Progress value={53} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">53% completado</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Donar con MercadoPago
                    </Button>
                  </CardFooter>
                </Card>

                {/* Fundraiser Card 5 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="mb-2">
                        Traslado
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>7 días restantes</span>
                      </div>
                    </div>
                    <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1388&q=80"
                        alt="Perros rescatados"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle>Traslado a refugio definitivo</CardTitle>
                    <CardDescription>
                      Necesitamos trasladar a 3 perros rescatados a un refugio en otra provincia. Ayudanos a cubrir el
                      transporte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Recaudado: $25.000</span>
                        <span className="text-muted-foreground">Meta: $40.000</span>
                      </div>
                      <Progress value={62} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">62% completado</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Donar con MercadoPago
                    </Button>
                  </CardFooter>
                </Card>

                {/* Fundraiser Card 6 */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        Medicamentos
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>15 días restantes</span>
                      </div>
                    </div>
                    <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                        alt="Gatitos rescatados"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle>Medicamentos para gatitos</CardTitle>
                    <CardDescription>
                      Necesitamos comprar medicamentos para 5 gatitos rescatados con problemas respiratorios.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Recaudado: $5.000</span>
                        <span className="text-muted-foreground">Meta: $12.000</span>
                      </div>
                      <Progress value={42} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">42% completado</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Donar con MercadoPago
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="urgent">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Selecciona esta pestaña para ver solo las colectas urgentes</p>
              </div>
            </TabsContent>
            <TabsContent value="medical">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Selecciona esta pestaña para ver solo las colectas para tratamientos médicos
                </p>
              </div>
            </TabsContent>
            <TabsContent value="food">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Selecciona esta pestaña para ver solo las colectas para alimentos
                </p>
              </div>
            </TabsContent>
            <TabsContent value="transport">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Selecciona esta pestaña para ver solo las colectas para traslados
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <span className="sr-only">Página anterior</span>
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
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="font-medium">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Página siguiente</span>
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
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Start a Fundraiser CTA */}
          <div className="mt-16 p-8 border rounded-lg bg-muted/50">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">¿Necesitas iniciar una colecta?</h2>
                <p className="text-muted-foreground">
                  Si eres una organización registrada, puedes crear una colecta para cubrir gastos de rescate,
                  tratamientos veterinarios, alimentos y más.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/organizaciones/colectas/nueva">
                    <Button size="lg" className="w-full sm:w-auto">
                      Crear nueva colecta
                    </Button>
                  </Link>
                  <Link href="/faq#colectas">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Más información
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1488330890490-c291ecf62571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Crear colecta para animales"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
