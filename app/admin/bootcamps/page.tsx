"use client"

import Link from "next/link"
import {
  BookOpen,
  Users,
  Clock,
  MapPin,
  CreditCard,
  Eye,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { bootcamps, sessions, allEnrollments } from "@/lib/data"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
}

export default function AdminBootcampsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-1">
          Bootcamps
        </h1>
        <p className="text-muted-foreground">
          Gerez vos formations et consultez les statistiques
        </p>
      </div>

      {/* Bootcamp Cards */}
      <div className="space-y-6">
        {bootcamps.map((bootcamp) => {
          const bootcampSessions = sessions.filter(
            (s) => s.bootcampSlug === bootcamp.slug
          )
          const bootcampEnrollments = allEnrollments.filter(
            (e) => e.bootcampSlug === bootcamp.slug
          )
          const paidEnrollments = bootcampEnrollments.filter(
            (e) => e.paymentStatus === "paid"
          )
          const revenue = paidEnrollments.reduce((sum, e) => sum + e.amount, 0)
          const totalSpots = bootcampSessions.reduce(
            (sum, s) => sum + s.spotsTotal,
            0
          )
          const filledSpots = bootcampSessions.reduce(
            (sum, s) => sum + (s.spotsTotal - s.spotsRemaining),
            0
          )

          const levelColors = {
            "Débutant": "bg-green-100 text-green-700",
            "Intermédiaire": "bg-blue-bright/10 text-blue-bright",
            "Avancé": "bg-violet/10 text-violet",
          }

          return (
            <Card key={bootcamp.slug} className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue to-violet" />
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{bootcamp.title}</CardTitle>
                      <Badge className={levelColors[bootcamp.level]}>
                        {bootcamp.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{bootcamp.tagline}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="gap-1 flex-shrink-0">
                    <Link href={`/bootcamps/${bootcamp.slug}`}>
                      <Eye className="w-3 h-3" /> Voir la page
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <CreditCard className="w-3.5 h-3.5" /> Prix
                    </div>
                    <p className="font-bold text-foreground">
                      {formatCurrency(bootcamp.price)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Clock className="w-3.5 h-3.5" /> Duree
                    </div>
                    <p className="font-bold text-foreground">
                      {bootcamp.hours}h ({bootcamp.duration})
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Users className="w-3.5 h-3.5" /> Inscrits
                    </div>
                    <p className="font-bold text-foreground">
                      {bootcampEnrollments.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-3.5 h-3.5" /> Sessions
                    </div>
                    <p className="font-bold text-foreground">
                      {bootcampSessions.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <div className="flex items-center gap-2 text-sm text-green-600 mb-1">
                      <CreditCard className="w-3.5 h-3.5" /> Revenu
                    </div>
                    <p className="font-bold text-green-700">
                      {formatCurrency(revenue)}
                    </p>
                  </div>
                </div>

                {/* Sessions List */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Sessions ({bootcampSessions.length})
                  </h4>
                  <div className="space-y-2">
                    {bootcampSessions.map((session) => {
                      const enrolled = session.spotsTotal - session.spotsRemaining
                      const percentage = (enrolled / session.spotsTotal) * 100
                      const statusColors = {
                        open: "bg-green-100 text-green-700",
                        almost_full: "bg-gold/10 text-gold-dark",
                        full: "bg-red-100 text-red-700",
                      }
                      const statusLabels = {
                        open: "Ouvert",
                        almost_full: "Presque complet",
                        full: "Complet",
                      }

                      return (
                        <div
                          key={session.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>
                                {new Date(session.dateStart).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                })}
                                {" - "}
                                {new Date(session.dateEnd).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5" />
                              {session.city} - {session.format}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-sm text-muted-foreground">
                              {enrolled}/{session.spotsTotal} places
                            </div>
                            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-blue to-violet"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <Badge className={statusColors[session.status]}>
                              {statusLabels[session.status]}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
