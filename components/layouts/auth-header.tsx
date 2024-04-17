'use client'
import BreadCrumb from "@/components/breadcrumb";
import Link from "next/link"
import {
  Home,
  LineChart,
  Menu,
  Package2,
  Users,
  Earth,
  Sword,
  Castle,
  GlobeLock,
  PersonStanding,
  Shield
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"


export default function AuthHeader({ children }: { children?: React.ReactNode }) {
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
    <div className="sticky z-10 top-0 bg-background">
      <header className="flex justify-between h-14 items-center gap-4 border-b px-4 lg:h-[60px]">
        <div className="flex items-center">
          <Sheet>
            {/* Burger button */}
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden mr-3"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            {/* Sidebar */}
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {navListItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground  ${pathname === item.href ? 'bg-muted' : 'text-muted-foreground'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    {item.badge && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <BreadCrumb />
        </div>

        {/* Optional navigation button  */}
        {children}
      </header>
    </div>
  )
}
