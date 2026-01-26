"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { 
  PlayCircle, 
  Clock, 
  CheckCircle2,
  Circle,
  ChevronRight,
  Download,
  BookOpen,
  Award
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  mockUser, 
  getBootcampBySlug, 
  getVideosByBootcamp,
  type CourseVideo 
} from "@/lib/data"

function VideoListItem({ video, bootcampSlug }: { video: CourseVideo; bootcampSlug: string }) {
  const progressPercent = video.totalDuration > 0 
    ? Math.round((video.watchedDuration / video.totalDuration) * 100)
    : 0

  return (
    <Link
      href={`/espace-personnel/formations/${bootcampSlug}/video/${video.id}`}
      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-violet/30 hover:bg-violet/5 transition-all group"
    >
      {/* Status Icon */}
      <div className="flex-shrink-0">
        {video.watched ? (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
        ) : video.watchedDuration > 0 ? (
          <div className="w-10 h-10 rounded-full bg-violet/10 flex items-center justify-center relative">
            <PlayCircle className="w-5 h-5 text-violet" />
            <svg className="absolute inset-0 w-10 h-10 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-violet/20"
              />
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${progressPercent * 1.13} 113`}
                className="text-violet"
              />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Circle className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground group-hover:text-violet transition-colors truncate">
          {video.title}
        </h4>
        <p className="text-sm text-muted-foreground truncate">
          {video.description}
        </p>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{video.duration}</span>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-violet transition-colors" />
    </Link>
  )
}

export default function FormationDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const bootcamp = getBootcampBySlug(slug)
  const enrollment = mockUser.enrollments.find(e => e.bootcampSlug === slug)
  const videos = getVideosByBootcamp(slug)

  if (!bootcamp || !enrollment) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Formation non trouvée</h1>
        <Button asChild>
          <Link href="/espace-personnel/formations">Retour aux formations</Link>
        </Button>
      </div>
    )
  }

  const watchedVideos = videos.filter(v => v.watched).length
  const totalWatchTime = videos.reduce((acc, v) => acc + v.watchedDuration, 0)
  const totalDuration = videos.reduce((acc, v) => acc + v.totalDuration, 0)

  // Group videos by day
  const videosByDay = bootcamp.program.map(day => ({
    day: day.day,
    title: day.title,
    videos: videos.filter(v => v.dayNumber === day.day)
  }))

  // Find next video to watch
  const nextVideo = videos.find(v => !v.watched)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/espace-personnel/formations" className="hover:text-foreground">
          Mes formations
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium truncate">{bootcamp.title}</span>
      </nav>

      {/* Header Card */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue to-violet" />
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <Badge className="mb-3">{bootcamp.level}</Badge>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">
                {bootcamp.title}
              </h1>
              <p className="text-muted-foreground mb-4">
                {bootcamp.tagline}
              </p>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progression</span>
                  <span className="text-sm font-semibold">{enrollment.progress}%</span>
                </div>
                <Progress value={enrollment.progress} className="h-3" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{watchedVideos} / {videos.length} vidéos</span>
                  <span>{Math.round(totalWatchTime / 60)} / {Math.round(totalDuration / 60)} min</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="lg:w-64 flex flex-col gap-3">
              {nextVideo ? (
                <Button asChild className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark">
                  <Link href={`/espace-personnel/formations/${slug}/video/${nextVideo.id}`}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {videos.some(v => v.watchedDuration > 0 && !v.watched) ? "Reprendre" : "Commencer"}
                  </Link>
                </Button>
              ) : (
                <Button asChild className="bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-bright text-blue-navy">
                  <Link href="/espace-personnel/certificats">
                    <Award className="w-4 h-4 mr-2" />
                    Obtenir le certificat
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href={`/bootcamps/${slug}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Voir le programme complet
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="w-5 h-5 text-violet" />
            Ressources téléchargeables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start h-auto py-3 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium">Support de cours</p>
                <p className="text-xs text-muted-foreground">PDF - 2.5 MB</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium">Templates</p>
                <p className="text-xs text-muted-foreground">ZIP - 1.2 MB</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-3 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium">Checklists</p>
                <p className="text-xs text-muted-foreground">PDF - 500 KB</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video List by Day */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Contenu de la formation</h2>
        <Accordion type="multiple" defaultValue={["day-1", "day-2"]} className="space-y-4">
          {videosByDay.map(({ day, title, videos: dayVideos }) => {
            const dayWatched = dayVideos.filter(v => v.watched).length
            const dayComplete = dayWatched === dayVideos.length && dayVideos.length > 0

            return (
              <AccordionItem 
                key={day} 
                value={`day-${day}`}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                  <div className="flex items-center gap-4 w-full">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      dayComplete 
                        ? "bg-green-100 text-green-600" 
                        : "bg-gradient-to-br from-blue to-violet text-white"
                    }`}>
                      {dayComplete ? <CheckCircle2 className="w-5 h-5" /> : `J${day}`}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground">Jour {day}: {title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {dayWatched} / {dayVideos.length} vidéos complétées
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-3 pt-2">
                    {dayVideos.length > 0 ? (
                      dayVideos.map((video) => (
                        <VideoListItem key={video.id} video={video} bootcampSlug={slug} />
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground py-4 text-center">
                        Aucune vidéo disponible pour ce jour.
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
