import Link from "next/link"
import Image from "next/image"
import { ColectaCard } from "@/components/colecta-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, Twitter, Edit, Car, Clock } from "lucide-react"
import { HomeIcon } from "lucide-react"

export default function OrganizationProfile() {
  return (
    <div className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                        <Image
                          src="https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                          alt="Logo de la organización"
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                      <h2 className="text-xl font-bold">Patitas Felices</h2>
                      <p className="text-sm text-muted-foreground mb-4">Organización de rescate animal</p>

                      <div className="w-full space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Capital Federal, Palermo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>+54 11 1234-5678</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>contacto@patitasfelices.org</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <Link href="https://www.patitasfelices.org" className="text-primary hover:underline">
                            www.patitasfelices.org
                          </Link>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                          <Instagram className="h-5 w-5" />
                          <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                          <Facebook className="h-5 w-5" />
                          <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Twitter</span>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar perfil
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pedidos publicados:</span>
                        <span className="font-medium">42</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pedidos completados:</span>
                        <span className="font-medium">38</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Colectas realizadas:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Animales rescatados:</span>
                        <span className="font-medium">87</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Miembro desde:</span>
                        <span className="font-medium">Marzo 2023</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">Sobre nosotros</TabsTrigger>
                  <TabsTrigger value="requests">Pedidos activos</TabsTrigger>
                  <TabsTrigger value="fundraisers">Colectas</TabsTrigger>
                  <TabsTrigger value="adoptions">En adopción</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre Patitas Felices</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        Somos una organización sin fines de lucro dedicada al rescate, rehabilitación y adopción
                        responsable de animales en situación de calle o maltrato. Fundada en 2018, nuestra misión es
                        brindar una segunda oportunidad a perros y gatos abandonados, proporcionándoles atención
                        veterinaria, alimento y un hogar temporal hasta encontrar una familia definitiva.
                      </p>
                      <p>
                        Trabajamos principalmente en la zona de Capital Federal y alrededores, con un equipo de
                        voluntarios comprometidos y hogares de tránsito que nos ayudan a cuidar a los animales
                        rescatados mientras encuentran su hogar definitivo.
                      </p>
                      <p>
                        No contamos con un refugio físico, por lo que dependemos completamente de la red de hogares de
                        tránsito y voluntarios para poder seguir rescatando y ayudando a más animales en situación de
                        vulnerabilidad.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cómo ayudarnos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>Hay muchas formas de colaborar con nuestra labor:</p>
                      <ul className="space-y-2 list-disc pl-6">
                        <li>Ofreciendo tu hogar como tránsito temporal</li>
                        <li>Ayudando con traslados a veterinarias</li>
                        <li>Donando alimento, medicamentos o insumos</li>
                        <li>Aportando económicamente a nuestras colectas</li>
                        <li>Difundiendo nuestros casos de adopción</li>
                        <li>Apadrinando a un animal rescatado</li>
                      </ul>
                      <div className="pt-4">
                        <Button>Contactar para ayudar</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requests" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Pedidos activos</h2>
                    <Link href="/organizaciones/pedidos/nuevo">
                      <Button>Nuevo pedido</Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="relative h-40 w-full rounded-md overflow-hidden mb-2">
                          <Image
                            src="https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
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
                          Necesitamos trasladar a un perro rescatado desde Palermo hasta una veterinaria en Belgrano. Es
                          un caso urgente.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Request Card 2 */}
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
                          Capital Federal, Caballito
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Buscamos hogar de tránsito por 15 días para 2 gatitos bebés rescatados. Se provee alimento y
                          arena.
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/organizaciones/pedidos">
                      <Button variant="outline">Ver historial de pedidos</Button>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="fundraisers" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Colectas activas</h2>
                    <Link href="/organizaciones/colectas/nueva">
                      <Button>Nueva colecta</Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ColectaCard
                      title="Cirugía urgente para Toby"
                      description="Toby necesita una cirugía de urgencia tras ser atropellado. Ayudanos a cubrir los gastos veterinarios."
                      imageSrc="https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                      imageAlt="Perro rescatado"
                      badge="Urgente"
                      badgeVariant="destructive"
                      collected={45000}
                      goal={60000}
                      daysLeft={5}
                    />
                    <ColectaCard
                      title="Tratamiento para Michi"
                      description="Michi necesita un tratamiento para una infección respiratoria. Ayudanos a cubrir los medicamentos."
                      imageSrc="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80"
                      imageAlt="Gato rescatado"
                      badge="Tratamiento"
                      badgeVariant="secondary"
                      collected={12000}
                      goal={20000}
                      daysLeft={12}
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/organizaciones/colectas">
                      <Button variant="outline">Ver historial de colectas</Button>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="adoptions" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Animales en adopción</h2>
                    <Link href="/organizaciones/adopciones/nueva">
                      <Button>Nueva publicación</Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Adoption Card 1 */}
                    <Card>
                      <div className="relative h-48 w-full">
                        <Image
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                          alt="Perro en adopción"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>Luna</CardTitle>
                        <CardDescription>Hembra • 2 años • Mestiza</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline">Castrada</Badge>
                          <Badge variant="outline">Vacunada</Badge>
                          <Badge variant="outline">Sociable</Badge>
                        </div>
                        <p className="text-sm">
                          Luna es una perrita muy cariñosa y juguetona. Se lleva bien con otros perros y con niños.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Ver detalles</Button>
                      </CardFooter>
                    </Card>

                    {/* Adoption Card 2 */}
                    <Card>
                      <div className="relative h-48 w-full">
                        <Image
                          src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                          alt="Gato en adopción"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>Simón</CardTitle>
                        <CardDescription>Macho • 1 año • Atigrado</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline">Castrado</Badge>
                          <Badge variant="outline">Vacunado</Badge>
                          <Badge variant="outline">Juguetón</Badge>
                        </div>
                        <p className="text-sm">
                          Simón es un gatito muy activo y curioso. Le encanta jugar y explorar nuevos lugares.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Ver detalles</Button>
                      </CardFooter>
                    </Card>

                    {/* Adoption Card 3 */}
                    <Card>
                      <div className="relative h-48 w-full">
                        <Image
                          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
                          alt="Perro en adopción"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>Rocky</CardTitle>
                        <CardDescription>Macho • 3 años • Mestizo</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline">Castrado</Badge>
                          <Badge variant="outline">Vacunado</Badge>
                          <Badge variant="outline">Tranquilo</Badge>
                        </div>
                        <p className="text-sm">
                          Rocky es un perro tranquilo y cariñoso. Ideal para familias o personas que busquen un
                          compañero fiel.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Ver detalles</Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/organizaciones/adopciones">
                      <Button variant="outline">Ver todas las publicaciones</Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
  )
}
