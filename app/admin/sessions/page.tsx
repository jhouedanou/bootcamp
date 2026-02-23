"use client"

import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sessions, getBootcampBySlug, allEnrollments } from "@/lib/data"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function AdminSessionsPage() {
  const openSessions = sessions.filter((s) => s.status === "open")
  const almostFullSessions = sessions.filter((s) => s.status === "almost_full")
  const fullSessions = sessions.filter((s) => s.status === "full")

  const statusConfig = {
    open: {
      label: "Ouvert",
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    almost_full: {
      label: "Presque complet",
      color: "bg-gold/10 text-gold-dark",
      icon: AlertCircle,
      iconColor: "text-gold-dark",
    },
    full: {
      label: "Complet",
      color: "bg-red-100 text-red-700",
      icon: XCircle,
      iconColor: "text-red-600",
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-1">
          Sessions
        </h1>
        <p className="text-muted-foreground">
          Planification et suivi des sessions de formation
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{openSessions.length}</p>
                <p className="text-sm text-muted-foreground">Ouvertes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <AlertCircle className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{almostFullSessions.length}</p>
                <p className="text-sm text-muted-foreground">Presque completes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{fullSessions.length}</p>
                <p className="text-sm text-muted-foreground">Completes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions
          .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime())
          .map((session) => {
            const bootcamp = getBootcampBySlug(session.bootcampSlug)
            const status = statusConfig[session.status]
            const StatusIcon = status.icon
            const enrolled = session.spotsTotal - session.spotsRemaining
            const percentage = (enrolled / session.spotsTotal) * 100
            const sessionEnrollments = allEnrollments.filter(
              (e) => e.sessionId === session.id
            )

            return (
              <Card key={session.id} className="overflow-hidden">
                <div
                  className={`h-1 ${
                    session.status === "open"
                      ? "bg-green-500"
                      : session.status === "almost_full"
                      ? "bg-gold"
                      : "bg-red-500"
                  }`}
                />
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg ${
                            session.status === "open"
                              ? "bg-green-100"
                              : session.status === "almost_full"
                              ? "bg-gold/10"
                              : "bg-red-100"
                          }`}
                        >
                          <StatusIcon className={`w-5 h-5 ${status.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {bootcamp?.title}
                          </h3>
                          <Badge className={`mt-1 ${status.color}`}>
                            {status.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-foreground">{formatDate(session.dateStart)}</p>
                            <p className="text-xs text-muted-foreground">
                              au {formatDate(session.dateEnd)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{session.city} - {session.format}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{session.trainer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{bootcamp?.hours}h de formation</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right flex-shrink-0">
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {enrolled}<span className="text-lg text-muted-foreground">/{session.spotsTotal}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">places occupees</p>
                      <div className="w-full lg:w-32 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            session.status === "open"
                              ? "bg-green-500"
                              : session.status === "almost_full"
                              ? "bg-gold"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      {session.spotsRemaining > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {session.spotsRemaining} place(s) restante(s)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enrolled participants */}
                  {sessionEnrollments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Participants inscrits ({sessionEnrollments.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sessionEnrollments.map((enrollment) => (
                          <div
                            key={enrollment.id}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm"
                          >
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center text-white text-[10px] font-bold">
                              {enrollment.userName.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="text-foreground">{enrollment.userName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
