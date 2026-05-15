import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, Clock, MessageSquare } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { tipoLabels, tipoIcons, urgenciaBadgeVariant, urgenciaLabel, zonaLabels } from "@/lib/pedido-display"
import { EditarPerfilOrgDialog } from "@/components/editar-perfil-org-dialog"
import { organizacionToJson } from "@/lib/serializers/organizacion"

const VALID_TABS = ["about", "requests", "fundraisers", "adoptions"] as const

export default async function OrganizationProfile({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const activeTab = VALID_TABS.includes(tab as (typeof VALID_TABS)[number]) ? tab! : "about"

  const session = await auth()
  if (!session?.user?.id) redirect("/voluntarios/login")
  if (!session.user.organizacionId) redirect("/organizaciones/registro")

  const org = await prisma.organizacion.findUnique({
    where: { id: session.user.organizacionId },
  })
  if (!org) redirect("/organizaciones/registro")

  const pedidos = await prisma.pedido.findMany({
    where: { organizacionId: org.id },
    include: { respuestas: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  })

  const totalRespuestas = pedidos.reduce((sum, p) => sum + p.respuestas.length, 0)

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
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground">
                          {org.nombre.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold">{org.nombre}</h2>
                      <p className="text-sm text-muted-foreground mb-4">Organización de rescate animal</p>

                      <div className="w-full space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{zonaLabels[org.zona] ?? org.zona}{org.direccion ? `, ${org.direccion}` : ""}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{org.telefono}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{org.email}</span>
                        </div>
                        {org.web && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <Link href={org.web} className="text-primary hover:underline" target="_blank">
                              {org.web.replace(/^https?:\/\//, "")}
                            </Link>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4 mt-4">
                        {org.instagram && (
                          <Link href={`https://instagram.com/${org.instagram.replace(/^@/, "")}`} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                          </Link>
                        )}
                        {org.facebook && (
                          <Link href={org.facebook.startsWith("http") ? org.facebook : `https://facebook.com/${org.facebook}`} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <EditarPerfilOrgDialog org={organizacionToJson(org)} />
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
                        <span className="font-medium">{pedidos.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Voluntarios anotados:</span>
                        <span className="font-medium">{totalRespuestas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Miembro desde:</span>
                        <span className="font-medium">{org.createdAt.toLocaleDateString("es-AR", { month: "long", year: "numeric" })}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue={activeTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">Sobre nosotros</TabsTrigger>
                  <TabsTrigger value="requests">Pedidos activos</TabsTrigger>
                  <TabsTrigger value="fundraisers">Colectas</TabsTrigger>
                  <TabsTrigger value="adoptions">En adopción</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre {org.nombre}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{org.descripcion}</p>
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

                  {pedidos.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No hay pedidos publicados.</p>
                  ) : (
                    <div className="space-y-6">
                      {pedidos.map((pedido) => {
                        const Icon = tipoIcons[pedido.tipo]
                        return (
                          <Card key={pedido.id}>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <Badge variant={urgenciaBadgeVariant(pedido.urgencia)} className="mb-2">
                                  {urgenciaLabel(pedido.urgencia)}
                                </Badge>
                                {pedido.fechaSugerida && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-4 w-4" />
                                    <span>{pedido.fechaSugerida.toISOString().slice(0, 10)}</span>
                                  </div>
                                )}
                              </div>
                              <CardTitle className="flex items-center gap-2">
                                {Icon && <Icon className="h-5 w-5" />}
                                {tipoLabels[pedido.tipo] ?? pedido.tipo}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {zonaLabels[pedido.zona] ?? pedido.zona}{pedido.direccion ? `, ${pedido.direccion}` : ""}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p>{pedido.descripcion}</p>

                              <div className="border-t pt-4">
                                <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                                  <MessageSquare className="h-4 w-4" />
                                  {pedido.respuestas.length === 0
                                    ? "Sin respuestas aún"
                                    : `${pedido.respuestas.length} ${pedido.respuestas.length === 1 ? "voluntario ofreció ayuda" : "voluntarios ofrecieron ayuda"}`}
                                </h4>
                                {pedido.respuestas.length === 0 ? (
                                  <p className="text-sm text-muted-foreground">Todavía nadie se anotó en este pedido.</p>
                                ) : (
                                  <div className="space-y-3">
                                    {pedido.respuestas.map((r) => {
                                      const waNumber = r.whatsapp.replace(/^\+/, "")
                                      return (
                                        <div key={r.id} className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                                          <div className="flex justify-between items-start">
                                            <span className="font-medium">{r.nombre}</span>
                                            <span className="text-xs text-muted-foreground">{r.createdAt.toLocaleDateString("es-AR")}</span>
                                          </div>
                                          <div className="flex items-center gap-1 text-muted-foreground">
                                            <Phone className="h-3 w-3" />
                                            <Link
                                              href={`https://wa.me/${waNumber}`}
                                              target="_blank"
                                              className="hover:text-foreground hover:underline transition-colors"
                                            >
                                              {r.whatsapp}
                                            </Link>
                                          </div>
                                          <p className="text-muted-foreground">{r.mensaje}</p>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="fundraisers" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Colectas activas</h2>
                    <Link href="/organizaciones/colectas/nueva">
                      <Button>Nueva colecta</Button>
                    </Link>
                  </div>

                  <p className="text-muted-foreground text-center py-8">Próximamente: gestión de colectas.</p>
                </TabsContent>

                <TabsContent value="adoptions" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Animales en adopción</h2>
                    <Link href="/organizaciones/adopciones/nueva">
                      <Button>Nueva publicación</Button>
                    </Link>
                  </div>

                  <p className="text-muted-foreground text-center py-8">Próximamente: publicaciones de adopción.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
  )
}
