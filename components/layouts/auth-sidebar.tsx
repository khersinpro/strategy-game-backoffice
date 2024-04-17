'use client'

import Link from "next/link"
import {
  Bell,
  Home,
  LineChart,
  Users,
  Swords,
  Earth,
  Sword,
  Castle,
  GlobeLock,
  PersonStanding,
  Shield,
  CircleUser
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Separator } from "../ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { LogoutButton } from "../auth/logout-button"
import ThemeButton from "@/src/theme/theme-button"

export default function AuthSideBar() {
  const pathname = usePathname()
  const navListItems = [
    {
      icon: Home,
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Users,
      title: "Utilisateurs",
      href: "/dashboard/user",
      badge: 6
    },
    {
      icon: GlobeLock,
      title: "Servers",
      href: "/dashboard/server",
    },
    {
      icon: PersonStanding,
      title: "Civilisations",
      href: "/dashboard/civilization",
    },
    {
      icon: Castle,
      title: "Batiments",
      href: "/dashboard/building",
    },
    {
      icon: Shield,
      title: "Type d'unités",
      href: "/dashboard/unit-type",
    },
    {
      icon: Sword,
      title: "Unités",
      href: "/dashboard/unit",
    },
    {
      icon: Earth,
      title: "Cartes",
      href: "/dashboard/map",
    },
    {
      icon: LineChart,
      title: "Ressources",
      href: "/dashboard/resource",
    },
  ]

  return (
    <div className="hidden border-r md:block md:w-[220px] lg:w-[300px]">
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">

        {/* Left top bloc with notifications */}
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Swords className="h-6 w-6" />
            <span className="">Strategy Game</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>

        {/* Desktop side navigation bar */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {
              navListItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === item.href ? 'bg-muted' : 'text-muted-foreground'}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))
            }
          </nav>
        </div>

        {/* User bar */}
        <div className="px-4">
          <Separator />
          <div className="py-4">
            {/* User menu dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </LogoutButton>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Theme button */}
            <ThemeButton />
          </div>
        </div>
      </div>
    </div>
  )
}
