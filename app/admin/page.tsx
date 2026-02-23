"use client"

import Link from "next/link"
import {
  Users,
  CreditCard,
  BookOpen,
  TrendingUp,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  allEnrollments,
  bootcamps,
  sessions,
  getBootcampBySlug,
  getSessionById,
} from "@/lib/data"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
}

export default function AdminDashboardPage() {
  const confirmedEnrollments = allEnrollments.filter((e) => e.status === "confirmed")
  const pendingEnrollments = allEnrollments.filter((e) => e.status === "pending")
  const totalRevenue = allEnrollments
    .filter((e) => e.paymentStatus === "paid")
    .reduce((sum, e) => sum + e.amount, 0)
  const upcomingSessions = sessions.filter((s) => s.status !== "full")

  const stats = [
    {
      label: "Total inscriptions",
      value: allEnrollments.length,
      icon: Users,
      color: "text-blue-bright",
      bgColor: "bg-blue-bright/10",
      change: "+3 ce mois",
      changeType: "up" as const,
    },
    {
      label: "Revenu total",
      value: formatCurrency(totalRevenue),
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+12%",
      changeType: "up" as const,
    },
    {
      label: "Bootcamps actifs",
      value: bootcamps.length,
      icon: BookOpen,
      color: "text-violet",
      bgColor: "bg-violet/10",
      change: "3 formations",
      changeType: "neutral" as const,
    },
    {
      label: "En attente",
      value: pendingEnrollments.length,
      icon: Clock,
      color: "text-gold-dark",
      bgColor: "bg-gold/10",
      change: "A traiter",
      changeType: "down" as const,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-1">
            Tableau de bord Admin
          </h1>
          <p className="text-muted-foreground">
            Vue d&apos;ensemble de l&apos;activite Big Five Academy
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white"
        >
          <Link href="/admin/inscriptions">
            Voir les inscriptions
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    {stat.changeType === "up" && (
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                    )}
                    {stat.changeType === "down" && (
                      <ArrowDownRight className="w-3 h-3 text-gold-dark" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="text-xl lg:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Dernieres inscriptions</CardTitle>
              <Link
                href="/admin/inscriptions"
                className="text-sm text-violet hover:text-violet-dark font-medium flex items-center gap-1"
              >
                Tout voir <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allEnrollments
                .sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime())
                .slice(0, 5)
                .map((enrollment) => {
                  const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
                  const statusColors = {
                    confirmed: "bg-green-100 text-green-700",
                    pending: "bg-gold/10 text-gold-dark",
                    cancelled: "bg-red-100 text-red-700",
                  }
                  const statusLabels = {
                    confirmed: "Confirme",
                    pending: "En attente",
                    cancelled: "Annule",
                  }
                  return (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {enrollment.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {enrollment.userName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {bootcamp?.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className={statusColors[enrollment.status]}>
                          {statusLabels[enrollment.status]}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Prochaines sessions</CardTitle>
              <Link
                href="/admin/sessions"
                className="text-sm text-violet hover:text-violet-dark font-medium flex items-center gap-1"
              >
                Tout voir <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSessions.slice(0, 5).map((session) => {
                const bootcamp = getBootcampBySlug(session.bootcampSlug)
                const spotsPercentage =
                  ((session.spotsTotal - session.spotsRemaining) / session.spotsTotal) * 100
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
                    className="p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {bootcamp?.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(session.dateStart)} - {formatDate(session.dateEnd)}
                          </span>
                        </div>
                      </div>
                      <Badge className={statusColors[session.status]}>
                        {statusLabels[session.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {session.spotsTotal - session.spotsRemaining} / {session.spotsTotal} places
                      </span>
                      <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue to-violet"
                          style={{ width: `${spotsPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Bootcamp */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Revenu par bootcamp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {bootcamps.map((bootcamp) => {
              const bootcampEnrollments = allEnrollments.filter(
                (e) => e.bootcampSlug === bootcamp.slug && e.paymentStatus === "paid"
              )
              const revenue = bootcampEnrollments.reduce((sum, e) => sum + e.amount, 0)
              return (
                <div
                  key={bootcamp.slug}
                  className="p-4 rounded-lg border border-border"
                >
                  <h3 className="font-medium text-foreground text-sm mb-2 truncate">
                    {bootcamp.title}
                  </h3>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(revenue)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {bootcampEnrollments.length} inscription(s) payee(s)
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
