"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-blue-navy">
              B<span className="relative">I<span className="absolute inset-0 w-full h-[3px] bg-violet rotate-[-20deg] top-1/2" /></span>G F<span className="relative">I<span className="absolute inset-0 w-full h-[3px] bg-violet rotate-[-20deg] top-1/2" /></span>VE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/bootcamps" 
              className="font-sans text-sm font-medium text-foreground hover:text-violet transition-colors"
            >
              Bootcamps
            </Link>
            <Link 
              href="/a-propos" 
              className="font-sans text-sm font-medium text-foreground hover:text-violet transition-colors"
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="font-sans text-sm font-medium text-foreground hover:text-violet transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/espace-personnel" 
              className="flex items-center gap-2 font-sans text-sm font-medium text-foreground hover:text-violet transition-colors"
            >
              <User className="w-4 h-4" />
              Mon espace
            </Link>
            <Button 
              asChild
              className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white font-medium px-6"
            >
              <Link href="/bootcamps">S&apos;inscrire</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-64 pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-4 pt-4">
            <Link 
              href="/bootcamps" 
              className="font-sans text-base font-medium text-foreground hover:text-violet transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Bootcamps
            </Link>
            <Link 
              href="/a-propos" 
              className="font-sans text-base font-medium text-foreground hover:text-violet transition-colors"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="font-sans text-base font-medium text-foreground hover:text-violet transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/espace-personnel" 
              className="flex items-center gap-2 font-sans text-base font-medium text-foreground hover:text-violet transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              Mon espace
            </Link>
            <Button 
              asChild
              className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white font-medium w-full mt-2"
            >
              <Link href="/bootcamps">S&apos;inscrire</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
