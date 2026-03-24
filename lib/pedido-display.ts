import type { LucideIcon } from "lucide-react"
import { Car, HomeIcon, Package, UserRound, Share2 } from "lucide-react"

export const tipoLabels: Record<string, string> = {
  traslado: "Traslado",
  transito: "Tránsito",
  entrega: "Entrega de alimentos/medicación",
  acompanamiento: "Acompañamiento a veterinaria",
  difusion: "Difusión en redes",
}

export const tipoIcons: Record<string, LucideIcon> = {
  traslado: Car,
  transito: HomeIcon,
  entrega: Package,
  acompanamiento: UserRound,
  difusion: Share2,
}

export const zonaLabels: Record<string, string> = {
  capital: "Capital Federal",
  "gba-norte": "GBA Zona Norte",
  "gba-sur": "GBA Zona Sur",
  "gba-oeste": "GBA Zona Oeste",
}

export function urgenciaBadgeVariant(u: string): "destructive" | "secondary" | "outline" {
  if (u === "alta") return "destructive"
  if (u === "media") return "secondary"
  return "outline"
}

export function urgenciaLabel(u: string): string {
  if (u === "alta") return "Urgente"
  if (u === "media") return "Media"
  return "Baja"
}
