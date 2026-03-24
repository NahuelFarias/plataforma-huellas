import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColectaCard } from "@/components/colecta-card"

export default function Fundraisers() {
  return (
      <div className="py-12">
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

                {/* Fundraiser Card 2 */}
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

                {/* Fundraiser Card 3 */}
                <ColectaCard
                  title="Alimento para refugio"
                  description="Necesitamos comprar alimento para 15 perros rescatados que están en nuestro refugio temporal."
                  imageSrc="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80"
                  imageAlt="Perros rescatados"
                  badge="Alimentos"
                  badgeVariant="outline"
                  collected={18000}
                  goal={30000}
                  daysLeft={20}
                />

                {/* Fundraiser Card 4 */}
                <ColectaCard
                  title="Radiografías para Luna"
                  description="Luna necesita radiografías para determinar si tiene una fractura en la pata. Ayudanos a cubrir los estudios."
                  imageSrc="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
                  imageAlt="Perro con fractura"
                  badge="Urgente"
                  badgeVariant="destructive"
                  collected={8000}
                  goal={15000}
                  daysLeft={3}
                />

                {/* Fundraiser Card 5 */}
                <ColectaCard
                  title="Traslado a refugio definitivo"
                  description="Necesitamos trasladar a 3 perros rescatados a un refugio en otra provincia. Ayudanos a cubrir el transporte."
                  imageSrc="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1388&q=80"
                  imageAlt="Perros rescatados"
                  badge="Traslado"
                  badgeVariant="secondary"
                  collected={25000}
                  goal={40000}
                  daysLeft={7}
                />

                {/* Fundraiser Card 6 */}
                <ColectaCard
                  title="Medicamentos para gatitos"
                  description="Necesitamos comprar medicamentos para 5 gatitos rescatados con problemas respiratorios."
                  imageSrc="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  imageAlt="Gatitos rescatados"
                  badge="Medicamentos"
                  badgeVariant="outline"
                  collected={5000}
                  goal={12000}
                  daysLeft={15}
                />
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
      </div>
  )
}
