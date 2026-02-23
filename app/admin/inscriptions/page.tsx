"use client"

import { useState } from "react"
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { allEnrollments, getBootcampBySlug, getSessionById } from "@/lib/data"

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

export default function AdminInscriptionsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentFilter, setPaymentFilter] = useState<string>("all")

  const filteredEnrollments = allEnrollments.filter((e) => {
    const matchesSearch =
      e.userName.toLowerCase().includes(search.toLowerCase()) ||
      e.userEmail.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || e.status === statusFilter
    const matchesPayment = paymentFilter === "all" || e.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const stats = {
    total: allEnrollments.length,
    confirmed: allEnrollments.filter((e) => e.status === "confirmed").length,
    pending: allEnrollments.filter((e) => e.status === "pending").length,
    cancelled: allEnrollments.filter((e) => e.status === "cancelled").length,
  }

  const statusConfig = {
    confirmed: { label: "Confirme", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "En attente", color: "bg-gold/10 text-gold-dark", icon: Clock },
    cancelled: { label: "Annule", color: "bg-red-100 text-red-700", icon: XCircle },
  }

  const paymentConfig = {
    paid: { label: "Paye", color: "bg-green-100 text-green-700" },
    pending: { label: "En attente", color: "bg-gold/10 text-gold-dark" },
    refunded: { label: "Rembourse", color: "bg-blue-bright/10 text-blue-bright" },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-1">
            Inscriptions
          </h1>
          <p className="text-muted-foreground">
            Gerez toutes les inscriptions aux bootcamps
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter("all")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-bright/10">
                <Users className="w-5 h-5 text-blue-bright" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter("confirmed")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.confirmed}</p>
                <p className="text-sm text-muted-foreground">Confirmes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter("pending")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Clock className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter("cancelled")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.cancelled}</p>
                <p className="text-sm text-muted-foreground">Annules</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="confirmed">Confirmes</option>
              <option value="pending">En attente</option>
              <option value="cancelled">Annules</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Tous les paiements</option>
              <option value="paid">Payes</option>
              <option value="pending">En attente</option>
              <option value="refunded">Rembourses</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {filteredEnrollments.length} inscription(s)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Participant</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Bootcamp</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Session</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Statut</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Paiement</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEnrollments.map((enrollment) => {
                  const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
                  const session = getSessionById(enrollment.sessionId)
                  const status = statusConfig[enrollment.status]
                  const payment = paymentConfig[enrollment.paymentStatus]

                  return (
                    <tr key={enrollment.id} className="hover:bg-muted/50">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {enrollment.userName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {enrollment.userName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {enrollment.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <p className="text-sm text-foreground truncate max-w-[200px]">
                          {bootcamp?.title}
                        </p>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {session && formatDate(session.dateStart)}
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge className={status.color}>{status.label}</Badge>
                      </td>
                      <td className="py-3">
                        <Badge className={payment.color}>{payment.label}</Badge>
                      </td>
                      <td className="py-3 text-right">
                        <p className="text-sm font-medium text-foreground">
                          {formatCurrency(enrollment.amount)}
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {filteredEnrollments.map((enrollment) => {
              const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
              const session = getSessionById(enrollment.sessionId)
              const status = statusConfig[enrollment.status]
              const payment = paymentConfig[enrollment.paymentStatus]

              return (
                <div key={enrollment.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {enrollment.userName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{enrollment.userName}</p>
                        <p className="text-xs text-muted-foreground">{enrollment.userEmail}</p>
                      </div>
                    </div>
                    <Badge className={status.color}>{status.label}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{bootcamp?.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {session && formatDate(session.dateStart)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={payment.color}>{payment.label}</Badge>
                        <span className="font-medium">{formatCurrency(enrollment.amount)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Mail className="w-3 h-3" /> Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Phone className="w-3 h-3" /> Appeler
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredEnrollments.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Aucune inscription trouvee</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
