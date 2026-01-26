"use client"

import Link from "next/link"
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  PlayCircle,
  ChevronRight,
  Calendar
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  mockUser, 
  getBootcampBySlug, 
  getSessionById,
  getVideosByBootcamp,
  type UserEnrollment 
} from "@/lib/data"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function EnrollmentCard({ enrollment }: { enrollment: UserEnrollment }) {
  const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
  const session = getSessionById(enrollment.sessionId)
  const videos = getVideosByBootcamp(enrollment.bootcampSlug)
  const watchedVideos = videos.filter(v => v.watched).length
  
  if (!bootcamp || !session) return null

  const statusColors = {
    in_progress: "bg-blue-bright/10 text-blue-bright",
    completed: "bg-green-100 text-green-700",
    not_started: "bg-muted text-muted-foreground",
  }

  const statusLabels = {
    in_progress: "En cours",
    completed: "Terminé",
    not_started: "À venir",
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue to-violet" />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate mb-1">
              {bootcamp.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(session.dateStart)}</span>
            </div>
          </div>
          <Badge className={statusColors[enrollment.status]}>
            {statusLabels[enrollment.status]}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-medium">{enrollment.progress}%</span>
          </div>
          <Progress value={enrollment.progress} className="h-2" />
          {videos.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {watchedVideos} / {videos.length} vidéos vues
            </p>
          )}
        </div>

        {enrollment.status === "in_progress" && (
          <Button asChild className="w-full mt-4" size="sm">
            <Link href={`/espace-personnel/formations/${enrollment.bootcampSlug}`}>
              <PlayCircle className="w-4 h-4 mr-2" />
              Continuer
            </Link>
          </Button>
        )}
        {enrollment.status === "not_started" && (
          <Button asChild variant="outline" className="w-full mt-4 bg-transparent" size="sm">
            <Link href={`/espace-personnel/formations/${enrollment.bootcampSlug}`}>
              Voir le programme
            </Link>
          </Button>
        )}
        {enrollment.status === "completed" && !enrollment.certificateRequested && (
          <Button asChild className="w-full mt-4 bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark" size="sm">
            <Link href="/espace-personnel/certificats">
              <Award className="w-4 h-4 mr-2" />
              Demander le certificat
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const completedCount = mockUser.enrollments.filter(e => e.status === "completed").length
  const inProgressCount = mockUser.enrollments.filter(e => e.status === "in_progress").length
  const totalHours = mockUser.enrollments.reduce((acc, e) => {
    const bootcamp = getBootcampBySlug(e.bootcampSlug)
    return acc + (bootcamp?.hours || 0) * (e.progress / 100)
  }, 0)

  const stats = [
    { label: "Formations", value: mockUser.enrollments.length, icon: BookOpen, color: "text-blue-bright" },
    { label: "En cours", value: inProgressCount, icon: TrendingUp, color: "text-violet" },
    { label: "Terminées", value: completedCount, icon: Award, color: "text-green-600" },
    { label: "Heures", value: Math.round(totalHours), icon: Clock, color: "text-gold-dark" },
  ]

  const currentEnrollment = mockUser.enrollments.find(e => e.status === "in_progress")
  const nextVideo = currentEnrollment 
    ? getVideosByBootcamp(currentEnrollment.bootcampSlug).find(v => !v.watched)
    : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">
          Bonjour, {mockUser.firstName} !
        </h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace de formation Big Five.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Continue Learning */}
      {nextVideo && currentEnrollment && (
        <Card className="overflow-hidden border-violet/20 bg-gradient-to-r from-blue/5 to-violet/5">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-shrink-0 w-full lg:w-48 h-28 rounded-lg bg-gradient-to-br from-blue to-violet flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-violet font-medium mb-1">Continuer votre formation</p>
                <h3 className="font-semibold text-foreground mb-2">{nextVideo.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{nextVideo.description}</p>
                <Button asChild className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark">
                  <Link href={`/espace-personnel/formations/${currentEnrollment.bootcampSlug}/video/${nextVideo.id}`}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Reprendre ({nextVideo.duration})
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enrollments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Mes formations</h2>
          <Link 
            href="/espace-personnel/formations"
            className="text-sm text-violet hover:text-violet-dark font-medium flex items-center gap-1"
          >
            Tout voir
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUser.enrollments.map((enrollment) => (
            <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-gold-dark" />
              Certificats disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Vous avez {completedCount} formation(s) terminée(s). 
              {completedCount > 0 && " Demandez vos certificats !"}
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/espace-personnel/certificats">
                Voir les certificats
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-bright" />
              Découvrir plus de formations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explorez notre catalogue de bootcamps pour continuer à développer vos compétences.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/bootcamps">
                Voir le catalogue
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
