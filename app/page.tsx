import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Package, Heart, MapPin, Clock, HomeIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Donde hay huellas, hay esperanza.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Conectamos organizaciones de rescate con voluntarios, hogares de tránsito y donantes, para resolver
                  los desafíos diarios del rescate animal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/voluntarios/registro">
                    <Button size="lg" className="w-full sm:w-auto">
                      Quiero ayudar
                    </Button>
                  </Link>
                  <Link href="/organizaciones/registro">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Soy una organización
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
                  alt="Perro rescatado mirando con esperanza"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-xl space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">¿Dónde querés ayudar?</h2>
              <p className="text-muted-foreground">Buscá pedidos de ayuda por zona o tipo de colaboración</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="capital">Capital Federal</SelectItem>
                    <SelectItem value="gba-norte">GBA Zona Norte</SelectItem>
                    <SelectItem value="gba-sur">GBA Zona Sur</SelectItem>
                    <SelectItem value="gba-oeste">GBA Zona Oeste</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tipo de ayuda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traslado">Traslados</SelectItem>
                    <SelectItem value="transito">Tránsito</SelectItem>
                    <SelectItem value="entrega">Entrega de alimentos/medicación</SelectItem>
                    <SelectItem value="acompanamiento">Acompañamiento a veterinaria</SelectItem>
                    <SelectItem value="difusion">Difusión en redes</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full sm:w-auto">Buscar</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Urgent Requests Section */}
        <section className="w-full py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Pedidos urgentes</h2>
                <p className="text-muted-foreground">Estos pedidos necesitan ayuda inmediata</p>
              </div>
              <Link href="/voluntarios/pedidos">
                <Button variant="outline">Ver todos los pedidos</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Urgent Request Card 1 */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="destructive" className="mb-2">
                      Urgente
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Hoy</span>
                    </div>
                  </div>
                  <div className="relative h-40 w-full rounded-md overflow-hidden mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Perro necesitando traslado"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Traslado urgente
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Capital Federal, Palermo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Necesitamos trasladar a un perro rescatado desde Palermo hasta una veterinaria en Belgrano. Es un
                    caso urgente.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/voluntarios/pedidos/1" className="w-full">
                    <Button className="w-full">Quiero ayudar</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Urgent Request Card 2 */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="destructive" className="mb-2">
                      Urgente
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Mañana</span>
                    </div>
                  </div>
                  <div className="relative h-40 w-full rounded-md overflow-hidden mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                      alt="Gatitos necesitando hogar temporal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <HomeIcon className="h-5 w-5" />
                    Tránsito temporal
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    GBA Zona Norte, San Isidro
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Buscamos hogar de tránsito por 15 días para 2 gatitos bebés rescatados. Se provee alimento y arena.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/voluntarios/pedidos/2" className="w-full">
                    <Button className="w-full">Quiero ayudar</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Urgent Request Card 3 */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="destructive" className="mb-2">
                      Urgente
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Hoy</span>
                    </div>
                  </div>
                  <div className="relative h-40 w-full rounded-md overflow-hidden mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
                      alt="Medicación para perro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Entrega de medicación
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    GBA Zona Oeste, Morón
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Necesitamos que alguien retire medicación de una veterinaria en Morón y la entregue a un hogar de
                    tránsito en la misma zona.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/voluntarios/pedidos/3" className="w-full">
                    <Button className="w-full">Quiero ayudar</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Beneficios de sumarte como voluntario</h2>
              <p className="mt-2 text-muted-foreground">Ayudar nunca fue tan fácil y organizado</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Ayudá desde tu zona</h3>
                <p className="text-muted-foreground">
                  Recibí pedidos de ayuda cercanos a tu ubicación para que puedas colaborar sin desplazarte lejos.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Recibí pedidos relevantes</h3>
                <p className="text-muted-foreground">
                  Configurá tus preferencias para recibir solo los tipos de pedidos en los que podés ayudar.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Elegí cómo y cuándo colaborar</h3>
                <p className="text-muted-foreground">
                  Definí tu disponibilidad y el tipo de ayuda que querés brindar según tus posibilidades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section (Optional) */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Testimonios</h2>
              <p className="mt-2 text-muted-foreground">Lo que dicen quienes ya son parte de Huellas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="italic">
                      "Gracias a Huellas pudimos encontrar voluntarios para trasladar a nuestros rescatados a las
                      veterinarias. Antes era muy difícil coordinar esto y ahora es mucho más simple."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full overflow-hidden h-12 w-12">
                        <Image
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                          alt="María Rodríguez"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">María Rodríguez</p>
                        <p className="text-sm text-muted-foreground">Fundación Patitas Felices</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <p className="italic">
                      "Como voluntario, me encanta poder ayudar en mi tiempo libre y cerca de mi casa. La plataforma
                      hace que sea muy fácil encontrar dónde puedo ser útil."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full overflow-hidden h-12 w-12">
                        <Image
                          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                          alt="Juan López"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Juan López</p>
                        <p className="text-sm text-muted-foreground">Voluntario desde 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">¿Listo para dejar tu huella?</h2>
                <p className="text-muted-foreground md:text-lg">
                  Cada pequeña acción cuenta. Registrate ahora y comenzá a ayudar a quienes más lo necesitan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/voluntarios/registro">
                    <Button size="lg" className="w-full sm:w-auto">
                      Registrarme como voluntario
                    </Button>
                  </Link>
                  <Link href="/organizaciones/registro">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Soy una organización
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                  alt="Voluntarios ayudando con perros"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
