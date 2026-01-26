"use client"

import { Calendar, MapPin, User, Users, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SessionCardProps {
  id: string
  dateStart: string
  dateEnd: string
  city: string
  format: "Présentiel" | "Hybride" | "En ligne"
  trainer: string
  spotsTotal: number
  spotsRemaining: number
  status: "open" | "almost_full" | "full"
  onSelect?: (id: string) => void
  onNotify?: (id: string) => void
  selected?: boolean
}

export function SessionCard({
  id,
  dateStart,
  dateEnd,
  city,
  format,
  trainer,
  spotsTotal,
  spotsRemaining,
  status,
  onSelect,
  onNotify,
  selected = false,
}: SessionCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const startDay = startDate.getDate()
    const endDay = endDate.getDate()
    const month = endDate.toLocaleDateString('fr-FR', { month: 'long' })
    const year = endDate.getFullYear()
    
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDay}-${endDay} ${month} ${year}`
    }
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  const statusConfig = {
    open: {
      badge: "Places disponibles",
      badgeClass: "bg-green-100 text-green-700 border-green-200",
      available: true,
    },
    almost_full: {
      badge: "Dernières places",
      badgeClass: "bg-gold-light text-gold-dark border-gold",
      available: true,
    },
    full: {
      badge: "Complet",
      badgeClass: "bg-red-100 text-red-700 border-red-200",
      available: false,
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 p-6 transition-all duration-200",
        selected 
          ? "border-violet bg-violet/5 shadow-lg shadow-violet/10" 
          : "border-border bg-card hover:border-blue-soft hover:shadow-md",
        !config.available && "opacity-75"
      )}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <Badge variant="outline" className={config.badgeClass}>
          {config.badge}
        </Badge>
      </div>

      {/* Date */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue to-violet flex items-center justify-center shrink-0">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground">
            {formatDateRange(dateStart, dateEnd)}
          </h3>
          <p className="font-sans text-sm text-muted-foreground">
            2 jours intensifs
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-violet" />
          <span className="font-sans text-sm text-foreground">{city}</span>
          <Badge variant="secondary" className="text-xs">{format}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-violet" />
          <span className="font-sans text-sm text-foreground">Animé par {trainer}</span>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-violet" />
          <span className="font-sans text-sm text-foreground">
            {config.available 
              ? `${spotsRemaining} place${spotsRemaining > 1 ? 's' : ''} restante${spotsRemaining > 1 ? 's' : ''} sur ${spotsTotal}`
              : `${spotsTotal} participants`
            }
          </span>
        </div>
      </div>

      {/* Action */}
      {config.available ? (
        <Button
          onClick={() => onSelect?.(id)}
          className={cn(
            "w-full font-medium",
            selected
              ? "bg-violet hover:bg-violet-dark text-white"
              : "bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white"
          )}
        >
          {selected ? "Session sélectionnée" : "Réserver ma place"}
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => onNotify?.(id)}
          className="w-full border-violet text-violet hover:bg-violet/5"
        >
          <Bell className="w-4 h-4 mr-2" />
          Me notifier des prochaines dates
        </Button>
      )}
    </div>
  )
}
