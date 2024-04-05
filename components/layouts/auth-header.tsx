'use client'

import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package2,
  Search,
  Users,
  Swords,
  Earth,
  Sword,
  Castle,
  GlobeLock,
  PersonStanding,
  Shield
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ThemeButton from "@/src/theme/theme-button"
import { LogoutButton } from "../auth/logout-button"
import { usePathname } from "next/navigation"


export default function AuthHeader({ children }: { children: React.ReactNode }) {
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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop side bar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">

          {/* Left top bloc with notifications */}
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
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
        </div>
      </div>

      {/* Header with mobile sidebar and main */}
      <div className="flex flex-col">

        {/* Header with mobile sidebar */}
        <div className="sticky top-0 bg-background">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Mobile sidebar */}
            <Sheet>
              {/* Burger button */}
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
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

            {/* Header search form */}
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>

            {/* Theme button */}
            <ThemeButton />

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
          </header>
        </div>

        {/* Main */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mainAuth">
          {children}
        </main>
      </div>
    </div>
  )
}
