import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQ() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Preguntas frecuentes</h1>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Encuentra respuestas a las dudas más comunes sobre cómo funciona Plataforma Huellas
            </p>
          </div>

          <Tabs defaultValue="general" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="volunteers">Voluntarios</TabsTrigger>
              <TabsTrigger value="organizations">Organizaciones</TabsTrigger>
              <TabsTrigger value="fundraisers">Colectas</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Qué es Plataforma Huellas?</AccordionTrigger>
                  <AccordionContent>
                    Plataforma Huellas es una plataforma solidaria que conecta organizaciones de rescate animal con
                    voluntarios, hogares de tránsito y donantes, para resolver los desafíos diarios del rescate animal.
                    Facilitamos la coordinación entre quienes necesitan ayuda y quienes quieren brindarla.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Cómo funciona la plataforma?</AccordionTrigger>
                  <AccordionContent>
                    Las organizaciones de rescate publican pedidos específicos de ayuda (traslados, tránsito, entrega de
                    alimentos, etc.). Los voluntarios registrados reciben notificaciones de pedidos que coinciden con su
                    zona y preferencias, y pueden ofrecerse para ayudar. La plataforma facilita la comunicación entre
                    ambas partes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Es gratuito usar Plataforma Huellas?</AccordionTrigger>
                  <AccordionContent>
                    Sí, la plataforma es completamente gratuita tanto para voluntarios como para organizaciones de
                    rescate. Nos mantenemos gracias a donaciones y apoyo de empresas comprometidas con el bienestar
                    animal.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Puedo participar sin adoptar?</AccordionTrigger>
                  <AccordionContent>
                    ¡Absolutamente! La plataforma está diseñada precisamente para ofrecer múltiples formas de ayudar sin
                    necesidad de adoptar. Puedes colaborar con traslados, tránsito temporal, entrega de alimentos,
                    difusión en redes, acompañamiento a veterinarias o donaciones económicas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>¿En qué zonas opera Plataforma Huellas?</AccordionTrigger>
                  <AccordionContent>
                    Actualmente operamos en Capital Federal y Gran Buenos Aires (Zona Norte, Sur y Oeste). Estamos
                    trabajando para expandirnos a otras provincias en el futuro cercano.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="volunteers" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cómo me registro como voluntario?</AccordionTrigger>
                  <AccordionContent>
                    Para registrarte como voluntario, haz clic en el botón "Quiero ayudar" en la página principal.
                    Completa el formulario con tus datos personales, zona donde puedes ayudar, tipos de ayuda que puedes
                    brindar y tu disponibilidad. Una vez registrado, podrás ver los pedidos disponibles y recibir
                    notificaciones.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Qué pasa cuando acepto un pedido?</AccordionTrigger>
                  <AccordionContent>
                    Cuando aceptas un pedido, la organización recibe una notificación con tus datos de contacto. Al
                    mismo tiempo, tú recibes los datos de contacto de la organización para coordinar los detalles. El
                    pedido quedará registrado en tu historial de actividades y se añadirá a tu calendario de
                    compromisos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Qué tipos de ayuda puedo brindar?</AccordionTrigger>
                  <AccordionContent>
                    Puedes ofrecer diferentes tipos de ayuda según tus posibilidades:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Traslados: llevar animales a veterinarias, hogares de tránsito, etc.</li>
                      <li>Tránsito: ofrecer tu hogar temporalmente para alojar animales rescatados.</li>
                      <li>Entrega de alimentos/medicación: retirar y entregar insumos.</li>
                      <li>Acompañamiento a veterinaria: acompañar a otros voluntarios a consultas.</li>
                      <li>Difusión en redes: compartir casos de adopción o pedidos urgentes.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Cómo configuro mi disponibilidad?</AccordionTrigger>
                  <AccordionContent>
                    Puedes configurar tu disponibilidad en la sección "Calendario" de tu perfil. Allí podrás indicar qué
                    días y horarios estás disponible para ayudar, así como marcar fechas específicas en las que no estás
                    disponible. Esto nos permite mostrarte solo los pedidos que coinciden con tu disponibilidad.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Cómo funcionan las notificaciones?</AccordionTrigger>
                  <AccordionContent>
                    Si activas las notificaciones, recibirás alertas por WhatsApp o email cuando haya nuevos pedidos que
                    coincidan con tu zona, tipo de ayuda y disponibilidad. Puedes configurar la frecuencia de estas
                    notificaciones en tu perfil, eligiendo entre recibir alertas inmediatas o resúmenes diarios.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="organizations" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cómo registro mi organización?</AccordionTrigger>
                  <AccordionContent>
                    Para registrar tu organización, haz clic en "Soy una organización" en la página principal. Deberás
                    completar un formulario con los datos de tu organización, incluyendo nombre, información de
                    contacto, zona de operación y documentación que acredite su existencia. Una vez verificada, podrás
                    comenzar a publicar pedidos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Cómo publico un pedido de ayuda?</AccordionTrigger>
                  <AccordionContent>
                    Una vez que tu organización esté registrada, puedes publicar pedidos desde tu panel de control. Haz
                    clic en "Nuevo pedido", selecciona el tipo de ayuda que necesitas, la zona, nivel de urgencia, fecha
                    y hora sugerida, y proporciona una descripción detallada. Los voluntarios que coincidan con los
                    requisitos recibirán notificaciones sobre tu pedido.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Cómo sé si un voluntario aceptó mi pedido?</AccordionTrigger>
                  <AccordionContent>
                    Cuando un voluntario acepta tu pedido, recibirás una notificación por email y/o WhatsApp con sus
                    datos de contacto. También podrás ver esta información en el panel de control de tu organización, en
                    la sección "Pedidos activos". Desde allí podrás contactar directamente al voluntario para coordinar
                    los detalles.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Puedo crear una colecta para mi organización?</AccordionTrigger>
                  <AccordionContent>
                    Sí, las organizaciones verificadas pueden crear colectas para recaudar fondos destinados a
                    tratamientos veterinarios, alimentos, traslados u otros gastos relacionados con el rescate animal.
                    Para crear una colecta, ve a la sección "Colectas" en tu panel de control y completa el formulario
                    con los detalles, incluyendo el monto objetivo y el destino de los fondos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Cómo puedo gestionar mis pedidos activos?</AccordionTrigger>
                  <AccordionContent>
                    En tu panel de control encontrarás una sección de "Pedidos activos" donde puedes ver todos los
                    pedidos que has publicado, su estado actual, y los voluntarios que los han aceptado. Desde allí
                    puedes marcar pedidos como completados, cancelarlos si ya no son necesarios, o editarlos si
                    necesitas modificar algún detalle.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="fundraisers" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cómo funciona el sistema de colectas?</AccordionTrigger>
                  <AccordionContent>
                    Las colectas permiten a las organizaciones recaudar fondos para casos específicos. Cada colecta
                    muestra el monto objetivo, el monto recaudado hasta el momento, y una descripción detallada del
                    destino de los fondos. Los donantes pueden contribuir a través de MercadoPago de forma segura y
                    transparente.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Cómo puedo donar a una colecta?</AccordionTrigger>
                  <AccordionContent>
                    Para donar a una colecta, simplemente navega a la sección "Colectas", elige la causa que quieras
                    apoyar y haz clic en "Donar con MercadoPago". Serás redirigido a una página segura donde podrás
                    completar tu donación. No es necesario estar registrado como voluntario para realizar donaciones.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Qué comisión cobra la plataforma por las donaciones?</AccordionTrigger>
                  <AccordionContent>
                    Plataforma Huellas no cobra ninguna comisión por las donaciones. El 100% de lo recaudado va
                    directamente a la organización, descontando únicamente las comisiones que pueda cobrar el procesador
                    de pagos (MercadoPago). Estas comisiones son transparentes y se muestran durante el proceso de
                    donación.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Cómo se garantiza que los fondos se usen correctamente?</AccordionTrigger>
                  <AccordionContent>
                    Las organizaciones que crean colectas deben estar verificadas en nuestra plataforma. Además, se les
                    solicita que publiquen comprobantes de los gastos realizados con los fondos recaudados. Los donantes
                    reciben actualizaciones sobre el progreso de la causa que apoyaron y pueden ver estos comprobantes
                    en la página de la colecta.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Puedo crear una colecta para un caso particular?</AccordionTrigger>
                  <AccordionContent>
                    Las colectas solo pueden ser creadas por organizaciones verificadas. Si conoces un caso particular
                    que necesita ayuda, te recomendamos contactar a una organización de rescate de tu zona para que
                    puedan evaluar el caso y, si lo consideran apropiado, crear una colecta para esa causa específica.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          {/* Contact Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>¿No encontraste lo que buscabas?</CardTitle>
                <CardDescription>Contáctanos directamente y te responderemos a la brevedad</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-6 items-center">
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-muted-foreground">
                    Nuestro equipo está disponible para resolver todas tus dudas sobre la plataforma.
                  </p>
                  <p className="font-medium">info@plataformahuellas.org</p>
                  <p className="font-medium">+54 11 1234-5678</p>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                  <Link href="/contacto">
                    <Button size="lg">Contactar al equipo</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
