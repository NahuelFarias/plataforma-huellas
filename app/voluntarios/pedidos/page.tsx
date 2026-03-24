import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Home, Package, UserRound, Share2, MapPin, Clock, Search, Filter } from "lucide-react"

export default function AvailableRequests() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pedidos disponibles</h1>
            <p className="text-muted-foreground">Estos son los pedidos que coinciden con tu zona y preferencias</p>
          </div>

          {/* Filters */}
          <div className="mb-8 p-4 border rounded-lg bg-background">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las zonas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las zonas</SelectItem>
                    <SelectItem value="capital">Capital Federal</SelectItem>
                    <SelectItem value="gba-norte">GBA Zona Norte</SelectItem>
                    <SelectItem value="gba-sur">GBA Zona Sur</SelectItem>
                    <SelectItem value="gba-oeste">GBA Zona Oeste</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    <SelectItem value="traslado">Traslados</SelectItem>
                    <SelectItem value="transito">Tránsito</SelectItem>
                    <SelectItem value="entrega">Entrega de alimentos/medicación</SelectItem>
                    <SelectItem value="acompanamiento">Acompañamiento a veterinaria</SelectItem>
                    <SelectItem value="difusion">Difusión en redes</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier urgencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cualquiera">Cualquier urgencia</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier fecha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cualquiera">Cualquier fecha</SelectItem>
                    <SelectItem value="hoy">Hoy</SelectItem>
                    <SelectItem value="manana">Mañana</SelectItem>
                    <SelectItem value="semana">Esta semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
                <Button className="w-full md:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Request Card 1 */}
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
                  Necesitamos trasladar a un perro rescatado desde Palermo hasta una veterinaria en Belgrano. Es un caso
                  urgente.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/voluntarios/pedidos/1" className="w-full">
                  <Button className="w-full">Quiero ayudar</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Request Card 2 */}
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
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
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

            {/* Request Card 3 */}
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

            {/* Request Card 4 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">
                    Media
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Mañana</span>
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="h-5 w-5" />
                  Acompañamiento a veterinaria
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Capital Federal, Caballito
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Necesitamos a alguien que pueda acompañar a una voluntaria a llevar a un gato a control veterinario en
                  Caballito.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/voluntarios/pedidos/4" className="w-full">
                  <Button className="w-full">Quiero ayudar</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Request Card 5 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="mb-2">
                    Baja
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Esta semana</span>
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Difusión en redes
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Cualquier zona
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Necesitamos ayuda para difundir en redes sociales a 5 perros adultos en adopción. Se proporcionan
                  fotos y textos.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/voluntarios/pedidos/5" className="w-full">
                  <Button className="w-full">Quiero ayudar</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Request Card 6 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">
                    Media
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Jueves</span>
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Entrega de alimentos
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  GBA Zona Sur, Lomas de Zamora
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Necesitamos que alguien pueda entregar una bolsa de alimento balanceado a un hogar de tránsito en
                  Lomas de Zamora.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/voluntarios/pedidos/6" className="w-full">
                  <Button className="w-full">Quiero ayudar</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

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
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
