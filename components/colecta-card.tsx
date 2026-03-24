import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Clock } from "lucide-react"

type ColectaCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  badge: string
  badgeVariant: "destructive" | "secondary" | "outline"
  collected: number
  goal: number
  daysLeft: number
  ctaHref?: string
}

export function ColectaCard({
  title,
  description,
  imageSrc,
  imageAlt,
  badge,
  badgeVariant,
  collected,
  goal,
  daysLeft,
  ctaHref,
}: ColectaCardProps) {
  const percent = goal > 0 ? Math.round((collected / goal) * 100) : 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant={badgeVariant} className="mb-2">
            {badge}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{daysLeft} días restantes</span>
          </div>
        </div>
        <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Recaudado: ${collected.toLocaleString("es-AR")}</span>
            <span className="text-muted-foreground">Meta: ${goal.toLocaleString("es-AR")}</span>
          </div>
          <Progress value={percent} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">{percent}% completado</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild={!!ctaHref}>
          {ctaHref ? (
            <a href={ctaHref}>
              <Heart className="mr-2 h-4 w-4" />
              Donar con MercadoPago
            </a>
          ) : (
            <>
              <Heart className="mr-2 h-4 w-4" />
              Donar con MercadoPago
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
