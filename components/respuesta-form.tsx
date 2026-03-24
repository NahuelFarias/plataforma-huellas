"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { crearRespuesta, type RespuestaFormState } from "@/app/(public)/voluntarios/pedidos/[id]/actions"

type RespuestaFormProps = {
  pedidoId: string
  userName?: string | null
}

const initialState: RespuestaFormState = { success: false }

export function RespuestaForm({ pedidoId, userName }: RespuestaFormProps) {
  const [state, formAction, isPending] = useActionState(crearRespuesta, initialState)

  if (state.success) {
    return (
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardContent className="p-6 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">¡Gracias por ofrecerte a ayudar!</p>
            <p className="text-sm text-green-700 dark:text-green-300">
              La organización recibirá tus datos y se pondrá en contacto por WhatsApp.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiero ayudar</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="pedidoId" value={pedidoId} />
          <input
            type="text"
            name="_hp"
            autoComplete="off"
            tabIndex={-1}
            className="absolute opacity-0 h-0 w-0 overflow-hidden"
          />

          {state.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md dark:text-red-400 dark:bg-red-950 dark:border-red-800">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              defaultValue={userName ?? ""}
              required
            />
            {state.fieldErrors?.nombre && (
              <p className="text-sm text-red-500">{state.fieldErrors.nombre}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              placeholder="5411XXXXXXXX"
              required
            />
            {state.fieldErrors?.whatsapp && (
              <p className="text-sm text-red-500">{state.fieldErrors.whatsapp}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje</Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              placeholder="Contá brevemente cómo podés ayudar..."
              rows={3}
              required
            />
            {state.fieldErrors?.mensaje && (
              <p className="text-sm text-red-500">{state.fieldErrors.mensaje}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Enviando..." : "Enviar oferta de ayuda"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
