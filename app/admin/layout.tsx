"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  Settings,
  ChevronLeft,
  Shield,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { adminUser } from "@/lib/data"

const sidebarLinks = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/inscriptions", label: "Inscriptions", icon: Users },
  { href: "/admin/bootcamps", label: "Bootcamps", icon: BookOpen },
  { href: "/admin/sessions", label: "Sessions", icon: Calendar },
  { href: "/admin/paiements", label: "Paiements", icon: CreditCard },
  { href: "/admin/parametres", label: "Parametres", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-navy text-white h-16">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-soft hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Retour au site</span>
            </Link>
            <div className="h-6 w-px bg-blue-slate hidden sm:block" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              <span className="font-serif text-xl font-bold tracking-tight">
                BIG FIVE <span className="text-gold text-sm font-sans font-normal">Admin</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{adminUser.name}</p>
              <p className="text-xs text-blue-soft">{adminUser.role === "super_admin" ? "Super Admin" : "Admin"}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-blue-navy font-bold text-sm">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-background border-r border-border hidden lg:flex flex-col">
          <div className="flex-1 p-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gold/10 to-gold-dark/10 border border-gold/20 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-blue-navy font-bold text-sm">
                AD
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{adminUser.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Super Admin
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/admin" && pathname.startsWith(link.href))
                const Icon = link.icon

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gradient-to-r from-gold/10 to-gold-dark/10 text-gold-dark"
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

          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Deconnexion
            </Link>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden z-50">
          <div className="flex items-center justify-around h-16">
            {sidebarLinks.slice(0, 5).map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/admin" && pathname.startsWith(link.href))
              const Icon = link.icon

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
                    isActive ? "text-gold-dark" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">
                    {link.label.split(" ").pop()}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-[calc(100vh-4rem)] pb-20 lg:pb-0">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
