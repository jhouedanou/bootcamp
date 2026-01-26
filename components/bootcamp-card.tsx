import React from "react"
import Link from "next/link"
import { Clock, Users, GraduationCap, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BootcampCardProps {
  slug: string
  title: string
  description: string
  duration: string
  level: "Débutant" | "Intermédiaire" | "Avancé"
  format: "Présentiel" | "Hybride" | "En ligne"
  price: number
  icon: React.ReactNode
  targets?: string[]
  featured?: boolean
}

export function BootcampCard({
  slug,
  title,
  description,
  duration,
  level,
  format,
  price,
  icon,
  targets = [],
  featured = false,
}: BootcampCardProps) {
  const levelColors = {
    "Débutant": "bg-blue-pale text-blue-deep",
    "Intermédiaire": "bg-gold-light text-gold-dark",
    "Avancé": "bg-violet/10 text-violet",
  }

  const formatColors = {
    "Présentiel": "bg-blue-bright/10 text-blue-bright",
    "Hybride": "bg-violet-soft/10 text-violet-soft",
    "En ligne": "bg-gold/20 text-gold-dark",
  }

  return (
    <Link href={`/bootcamps/${slug}`} className="block group">
      <article
        className={cn(
          "relative h-full bg-card rounded-xl border border-border overflow-hidden transition-all duration-300",
          "hover:shadow-xl hover:shadow-violet/10 hover:-translate-y-1 hover:border-violet/30",
          featured && "border-violet/50 shadow-lg shadow-violet/5"
        )}
      >
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-blue to-violet text-white border-0">
              Populaire
            </Badge>
          </div>
        )}

        <div className="p-6">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center mb-4">
            <div className="text-white">
              {icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-violet transition-colors text-balance">
            {title}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>

          {/* Targets */}
          {targets.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {targets.slice(0, 2).map((target) => (
                <span
                  key={target}
                  className="inline-flex items-center gap-1 text-xs font-sans text-muted-foreground"
                >
                  <Users className="w-3 h-3" />
                  {target}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className={levelColors[level]}>
              <GraduationCap className="w-3 h-3 mr-1" />
              {level}
            </Badge>
            <Badge variant="secondary" className={formatColors[format]}>
              {format}
            </Badge>
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </Badge>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-sans text-xs text-muted-foreground">À partir de</p>
              <p className="font-serif text-xl font-bold text-violet">
                {price.toLocaleString('fr-FR')} <span className="text-sm font-medium">FCFA</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-blue group-hover:text-violet transition-colors">
              Voir le programme
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
