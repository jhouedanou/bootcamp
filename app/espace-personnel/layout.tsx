"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  PlayCircle, 
  Award, 
  CreditCard, 
  Settings,
  ChevronLeft,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockUser } from "@/lib/data"

const sidebarLinks = [
  { href: "/espace-personnel", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/espace-personnel/formations", label: "Mes formations", icon: PlayCircle },
  { href: "/espace-personnel/certificats", label: "Certificats", icon: Award },
  { href: "/espace-personnel/abonnements", label: "Abonnements", icon: CreditCard },
  { href: "/espace-personnel/parametres", label: "Paramètres", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Retour au site</span>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight text-blue-navy">
                BIG FIVE
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">
                {mockUser.firstName} {mockUser.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white font-medium">
              {mockUser.firstName[0]}{mockUser.lastName[0]}
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-background border-r border-border hidden lg:block">
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue/5 to-violet/5 border border-blue/10 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white font-semibold">
                {mockUser.firstName[0]}{mockUser.lastName[0]}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {mockUser.firstName} {mockUser.lastName}
                </p>
                <p className="text-xs text-muted-foreground">Membre Premium</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href || 
                  (link.href !== "/espace-personnel" && pathname.startsWith(link.href))
                const Icon = link.icon
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-gradient-to-r from-blue/10 to-violet/10 text-violet" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden z-50">
          <div className="flex items-center justify-around h-16">
            {sidebarLinks.slice(0, 4).map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== "/espace-personnel" && pathname.startsWith(link.href))
              const Icon = link.icon
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
                    isActive 
                      ? "text-violet" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{link.label.split(" ").pop()}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-[calc(100vh-4rem)] pb-20 lg:pb-0">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
