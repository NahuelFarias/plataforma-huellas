"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type UserMenuProps = {
  name: string | null
  image: string | null
  role: string | null
  onSignOut: () => Promise<void>
}

function getInitials(name: string | null) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function UserMenu({ name, image, role, onSignOut }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 min-h-11 min-w-11 rounded-full">
          <Avatar className="h-8 w-8">
            {image && <AvatarImage src={image} alt={name ?? "Avatar"} />}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex flex-col gap-1 px-2 py-1.5">
          <p className="text-sm font-medium">{name}</p>
          <Badge variant={role === "organizacion" ? "default" : "secondary"} className="w-fit text-xs">
            {role === "organizacion" ? "Organización" : "Voluntario"}
          </Badge>
        </div>
        <DropdownMenuItem asChild>
          <form action={onSignOut} className="w-full">
            <button type="submit" className="flex w-full min-h-11 items-center gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
