"use client"

import Link from "next/link"
import { useState } from "react"
import { 
  PlayCircle, 
  Clock, 
  Calendar,
  CheckCircle2,
  Circle,
  Filter
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

function EnrollmentDetailCard({ enrollment }: { enrollment: UserEnrollment }) {
  const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
  const session = getSessionById(enrollment.sessionId)
  const videos = getVideosByBootcamp(enrollment.bootcampSlug)
  const watchedVideos = videos.filter(v => v.watched).length
  
  if (!bootcamp || !session) return null

  const statusColors = {
    in_progress: "bg-blue-bright/10 text-blue-bright border-blue-bright/20",
    completed: "bg-green-100 text-green-700 border-green-200",
    not_started: "bg-muted text-muted-foreground border-border",
  }

  const statusLabels = {
    in_progress: "En cours",
    completed: "Terminé",
    not_started: "À venir",
  }

  return (
    <Card className="overflow-hidden">
      <div className={`h-1 ${enrollment.status === "completed" ? "bg-green-500" : "bg-gradient-to-r from-blue to-violet"}`} />
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left - Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge className={statusColors[enrollment.status]} variant="outline">
                  {statusLabels[enrollment.status]}
                </Badge>
                <h3 className="font-serif text-xl font-semibold text-foreground mt-2">
                  {bootcamp.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {bootcamp.tagline}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(session.dateStart)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{bootcamp.hours} heures</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" />
                <span>{videos.length} vidéos</span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progression globale</span>
                <span className="font-semibold">{enrollment.progress}%</span>
              </div>
              <Progress value={enrollment.progress} className="h-2.5" />
              <p className="text-xs text-muted-foreground">
                {watchedVideos} sur {videos.length} vidéos complétées
              </p>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="lg:w-64 flex flex-col gap-3">
            {enrollment.status === "in_progress" && (
              <Button asChild className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark">
                <Link href={`/espace-personnel/formations/${enrollment.bootcampSlug}`}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Continuer la formation
                </Link>
              </Button>
            )}
            {enrollment.status === "not_started" && (
              <Button asChild className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark">
                <Link href={`/espace-personnel/formations/${enrollment.bootcampSlug}`}>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Commencer
                </Link>
              </Button>
            )}
            {enrollment.status === "completed" && (
              <>
                <Button asChild variant="outline">
                  <Link href={`/espace-personnel/formations/${enrollment.bootcampSlug}`}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Revoir la formation
                  </Link>
                </Button>
                {!enrollment.certificateIssued && (
                  <Button asChild className="bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-bright text-blue-navy">
                    <Link href="/espace-personnel/certificats">
                      Obtenir le certificat
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Video List Preview */}
        {videos.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium text-sm text-foreground mb-3">Contenu de la formation</h4>
            <div className="grid gap-2">
              {videos.slice(0, 3).map((video) => (
                <Link
                  key={video.id}
                  href={`/espace-personnel/formations/${enrollment.bootcampSlug}/video/${video.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                >
                  {video.watched ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-violet">
                      {video.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                  </div>
                  <PlayCircle className="w-4 h-4 text-muted-foreground group-hover:text-violet" />
                </Link>
              ))}
              {videos.length > 3 && (
                <Link
                  href={`/espace-personnel/formations/${enrollment.bootcampSlug}`}
                  className="text-sm text-violet hover:text-violet-dark font-medium text-center py-2"
                >
                  Voir les {videos.length - 3} autres vidéos
                </Link>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FormationsPage() {
  const [filter, setFilter] = useState<"all" | "in_progress" | "completed" | "not_started">("all")

  const filteredEnrollments = filter === "all" 
    ? mockUser.enrollments 
    : mockUser.enrollments.filter(e => e.status === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">
          Mes formations
        </h1>
        <p className="text-muted-foreground">
          Suivez votre progression et accédez à vos contenus de formation.
        </p>
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
          <TabsTrigger value="all" className="text-sm">
            Toutes ({mockUser.enrollments.length})
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="text-sm">
            En cours ({mockUser.enrollments.filter(e => e.status === "in_progress").length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-sm">
            Terminées ({mockUser.enrollments.filter(e => e.status === "completed").length})
          </TabsTrigger>
          <TabsTrigger value="not_started" className="text-sm">
            À venir ({mockUser.enrollments.filter(e => e.status === "not_started").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredEnrollments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Aucune formation dans cette catégorie.
                </p>
                <Button asChild>
                  <Link href="/bootcamps">Découvrir nos formations</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredEnrollments.map((enrollment) => (
                <EnrollmentDetailCard key={enrollment.id} enrollment={enrollment} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
