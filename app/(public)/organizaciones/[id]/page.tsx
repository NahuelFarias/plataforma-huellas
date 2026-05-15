import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Phone, Mail, Globe, Instagram, Facebook } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { PedidoCard } from "@/components/pedido-card"
import { pedidoToJson } from "@/lib/serializers/pedido"
import { zonaLabels } from "@/lib/pedido-display"

function isValidObjectId(id: string) {
  return /^[a-fA-F0-9]{24}$/.test(id)
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isValidObjectId(id)) return {}
  const org = await prisma.organizacion.findUnique({
    where: { id },
    select: { nombre: true, descripcion: true },
  })
  if (!org) return {}
  return {
    title: `${org.nombre} | Huellas`,
    description: org.descripcion,
  }
}

export default async function PublicOrgProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!isValidObjectId(id)) notFound()

  const org = await prisma.organizacion.findUnique({
    where: { id },
    include: {
      pedidos: { orderBy: { createdAt: "desc" } },
    },
  })

  if (!org) notFound()

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
                    <h1 className="text-xl font-bold">{org.nombre}</h1>
                    <p className="text-sm text-muted-foreground mb-4">Organización de rescate animal</p>

                    <div className="w-full space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>{zonaLabels[org.zona] ?? org.zona}{org.direccion ? `, ${org.direccion}` : ""}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>{org.telefono}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="break-all">{org.email}</span>
                      </div>
                      {org.web && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                          <Link href={org.web} className="text-primary hover:underline break-all" target="_blank">
                            {org.web.replace(/^https?:\/\//, "")}
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {org.instagram && (
                        <Link
                          href={`https://instagram.com/${org.instagram.replace(/^@/, "")}`}
                          className="min-h-11 min-w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          target="_blank"
                        >
                          <Instagram className="h-5 w-5" />
                          <span className="sr-only">Instagram</span>
                        </Link>
                      )}
                      {org.facebook && (
                        <Link
                          href={org.facebook.startsWith("http") ? org.facebook : `https://facebook.com/${org.facebook}`}
                          className="min-h-11 min-w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          target="_blank"
                        >
                          <Facebook className="h-5 w-5" />
                          <span className="sr-only">Facebook</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pedidos publicados:</span>
                      <span className="font-medium">{org.pedidos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Miembro desde:</span>
                      <span className="font-medium">
                        {org.createdAt.toLocaleDateString("es-AR", { month: "long", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sobre {org.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{org.descripcion}</p>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-6">Pedidos activos</h2>
              {org.pedidos.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Esta organización no tiene pedidos publicados.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {org.pedidos.map((pedido) => (
                    <PedidoCard key={pedido.id} pedido={pedidoToJson(pedido)} hideOrgLink />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
