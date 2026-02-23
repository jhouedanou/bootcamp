"use client"

import {
  CreditCard,
  TrendingUp,
  Clock,
  RotateCcw,
  Calendar,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function AdminPaiementsPage() {
  const paidEnrollments = allEnrollments.filter((e) => e.paymentStatus === "paid")
  const pendingPayments = allEnrollments.filter((e) => e.paymentStatus === "pending")
  const refundedPayments = allEnrollments.filter((e) => e.paymentStatus === "refunded")

  const totalRevenue = paidEnrollments.reduce((sum, e) => sum + e.amount, 0)
  const pendingAmount = pendingPayments.reduce((sum, e) => sum + e.amount, 0)
  const refundedAmount = refundedPayments.reduce((sum, e) => sum + e.amount, 0)

  const paymentStatusConfig = {
    paid: { label: "Paye", color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { label: "En attente", color: "bg-gold/10 text-gold-dark", icon: Clock },
    refunded: { label: "Rembourse", color: "bg-blue-bright/10 text-blue-bright", icon: RotateCcw },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-1">
          Paiements
        </h1>
        <p className="text-muted-foreground">
          Suivi des paiements et revenus
        </p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenu total</p>
                <p className="text-2xl font-bold text-green-700">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {paidEnrollments.length} paiement(s) recu(s)
            </p>
          </CardContent>
        </Card>
        <Card className="border-gold/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-gold/10">
                <Clock className="w-6 h-6 text-gold-dark" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold text-gold-dark">{formatCurrency(pendingAmount)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {pendingPayments.length} paiement(s) en attente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-blue-bright/10">
                <RotateCcw className="w-6 h-6 text-blue-bright" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rembourse</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(refundedAmount)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {refundedPayments.length} remboursement(s)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Historique des transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Participant</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Formation</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Statut</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {allEnrollments
                  .sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime())
                  .map((enrollment) => {
                    const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
                    const status = paymentStatusConfig[enrollment.paymentStatus]
                    const StatusIcon = status.icon

                    return (
                      <tr key={enrollment.id} className="hover:bg-muted/50">
                        <td className="py-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            {formatDate(enrollment.enrolledAt)}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white text-xs font-bold">
                              {enrollment.userName.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{enrollment.userName}</p>
                              <p className="text-xs text-muted-foreground">{enrollment.userEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <p className="text-sm text-foreground truncate max-w-[200px]">
                            {bootcamp?.title}
                          </p>
                        </td>
                        <td className="py-3">
                          <Badge className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <p className={`text-sm font-bold ${
                            enrollment.paymentStatus === "paid"
                              ? "text-green-700"
                              : enrollment.paymentStatus === "refunded"
                              ? "text-muted-foreground line-through"
                              : "text-gold-dark"
                          }`}>
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
            {allEnrollments
              .sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime())
              .map((enrollment) => {
                const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
                const status = paymentStatusConfig[enrollment.paymentStatus]

                return (
                  <div key={enrollment.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white text-xs font-bold">
                          {enrollment.userName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{enrollment.userName}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(enrollment.enrolledAt)}</p>
                        </div>
                      </div>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate flex-1 mr-2">{bootcamp?.title}</p>
                      <p className="text-sm font-bold text-foreground">{formatCurrency(enrollment.amount)}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
