"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Award,
  Download,
  CheckCircle2,
  Clock,
  Calendar,
  Share2,
  Eye,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { 
  mockUser, 
  getBootcampBySlug, 
  getSessionById 
} from "@/lib/data"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function CertificatsPage() {
  const [requestingId, setRequestingId] = useState<string | null>(null)
  const [requestedIds, setRequestedIds] = useState<string[]>([])

  const completedEnrollments = mockUser.enrollments.filter(e => e.status === "completed")
  const inProgressEnrollments = mockUser.enrollments.filter(e => e.status === "in_progress")

  const handleRequestCertificate = async (enrollmentId: string) => {
    setRequestingId(enrollmentId)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRequestedIds(prev => [...prev, enrollmentId])
    setRequestingId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">
          Mes certificats
        </h1>
        <p className="text-muted-foreground">
          Téléchargez vos certificats de formation Big Five.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {completedEnrollments.filter(e => e.certificateIssued).length}
              </p>
              <p className="text-sm text-muted-foreground">Certificats obtenus</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/20">
              <Clock className="w-5 h-5 text-gold-dark" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {completedEnrollments.filter(e => !e.certificateIssued).length}
              </p>
              <p className="text-sm text-muted-foreground">En attente</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-bright/10">
              <Award className="w-5 h-5 text-blue-bright" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{inProgressEnrollments.length}</p>
              <p className="text-sm text-muted-foreground">Formations en cours</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issued Certificates */}
      {completedEnrollments.filter(e => e.certificateIssued).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Certificats obtenus
          </h2>
          <div className="grid gap-4">
            {completedEnrollments
              .filter(e => e.certificateIssued)
              .map((enrollment) => {
                const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
                const session = getSessionById(enrollment.sessionId)
                if (!bootcamp || !session) return null

                return (
                  <Card key={enrollment.id} className="overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-gold-dark to-gold" />
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Certificate Preview */}
                        <div className="flex-shrink-0 w-full lg:w-48 h-32 rounded-lg bg-gradient-to-br from-blue-navy to-violet p-4 flex flex-col justify-between text-white">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-xs">BIG FIVE</span>
                            <Award className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-xs opacity-80">Certificat de réussite</p>
                            <p className="font-semibold text-sm truncate">{bootcamp.title}</p>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <Badge className="bg-green-100 text-green-700 mb-2">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Certificat délivré
                          </Badge>
                          <h3 className="font-semibold text-foreground mb-1">
                            {bootcamp.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Obtenu le {formatDate(session.dateEnd)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 lg:flex-col">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1 lg:flex-none bg-transparent">
                                <Eye className="w-4 h-4 mr-2" />
                                Voir
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Certificat de formation</DialogTitle>
                                <DialogDescription>
                                  Certificat officiel Big Five
                                </DialogDescription>
                              </DialogHeader>
                              <div className="aspect-[1.414/1] bg-gradient-to-br from-blue-navy via-violet to-blue-deep rounded-lg p-8 text-white relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet/30 rounded-full blur-3xl" />
                                
                                <div className="relative h-full flex flex-col">
                                  {/* Header */}
                                  <div className="text-center mb-6">
                                    <p className="font-serif text-2xl font-bold tracking-widest text-gold">BIG FIVE</p>
                                    <p className="text-sm opacity-80 mt-1">Formation Professionnelle</p>
                                  </div>

                                  {/* Main Content */}
                                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                                    <Award className="w-16 h-16 text-gold mb-4" />
                                    <p className="text-sm uppercase tracking-widest opacity-80 mb-2">Certificat de réussite</p>
                                    <p className="text-xl font-semibold mb-4">{mockUser.firstName} {mockUser.lastName}</p>
                                    <p className="text-sm opacity-80 mb-2">a complété avec succès la formation</p>
                                    <p className="text-lg font-serif font-semibold text-gold">{bootcamp.title}</p>
                                    <p className="text-sm opacity-80 mt-4">{bootcamp.hours} heures de formation</p>
                                  </div>

                                  {/* Footer */}
                                  <div className="flex items-center justify-between text-xs opacity-80">
                                    <span>Abidjan, Côte d&apos;Ivoire</span>
                                    <span>{formatDate(session.dateEnd)}</span>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button className="flex-1 lg:flex-none bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark">
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                          </Button>
                          <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      )}

      {/* Available Certificates */}
      {completedEnrollments.filter(e => !e.certificateIssued).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-dark" />
            Certificats disponibles
          </h2>
          <div className="grid gap-4">
            {completedEnrollments
              .filter(e => !e.certificateIssued)
              .map((enrollment) => {
                const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
                const session = getSessionById(enrollment.sessionId)
                const isRequested = enrollment.certificateRequested || requestedIds.includes(enrollment.id)
                const isRequesting = requestingId === enrollment.id

                if (!bootcamp || !session) return null

                return (
                  <Card key={enrollment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                          <Award className="w-6 h-6 text-gold-dark" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {bootcamp.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Formation terminée le {formatDate(session.dateEnd)}
                          </p>
                        </div>
                        {isRequested ? (
                          <Badge className="bg-blue-bright/10 text-blue-bright">
                            <Clock className="w-3 h-3 mr-1" />
                            En cours de génération
                          </Badge>
                        ) : (
                          <Button 
                            onClick={() => handleRequestCertificate(enrollment.id)}
                            disabled={isRequesting}
                            className="bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-bright text-blue-navy"
                          >
                            {isRequesting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Demande en cours...
                              </>
                            ) : (
                              <>
                                <Award className="w-4 h-4 mr-2" />
                                Demander le certificat
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      )}

      {/* In Progress - Cannot get certificate yet */}
      {inProgressEnrollments.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Formations en cours
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                Terminez ces formations pour obtenir vos certificats :
              </p>
              <div className="space-y-3">
                {inProgressEnrollments.map((enrollment) => {
                  const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
                  if (!bootcamp) return null

                  return (
                    <div key={enrollment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">{bootcamp.title}</p>
                        <p className="text-sm text-muted-foreground">Progression : {enrollment.progress}%</p>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/espace-personnel/formations/${enrollment.bootcampSlug}`}>
                          Continuer
                        </Link>
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {completedEnrollments.length === 0 && inProgressEnrollments.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Aucun certificat disponible</h3>
            <p className="text-muted-foreground mb-4">
              Inscrivez-vous à une formation pour obtenir votre premier certificat !
            </p>
            <Button asChild>
              <Link href="/bootcamps">Découvrir nos formations</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
