"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, ArrowLeft, CheckCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SessionCard } from "@/components/session-card"
import type { Bootcamp, Session } from "@/lib/data"

interface SessionsClientProps {
  bootcamp: Bootcamp
  sessions: Session[]
  slug: string
}

export function SessionsClient({ bootcamp, sessions, slug }: SessionsClientProps) {
  const router = useRouter()
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  const handleSelectSession = (sessionId: string) => {
    setSelectedSession(sessionId)
  }

  const handleNotify = (sessionId: string) => {
    alert(`Vous serez notifié des prochaines dates pour cette session. (Session ID: ${sessionId})`)
  }

  const handleContinue = () => {
    if (selectedSession) {
      router.push(`/checkout?bootcamp=${slug}&session=${selectedSession}`)
    }
  }

  const selectedSessionData = sessions.find((s) => s.id === selectedSession)

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 lg:pt-20 bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue to-violet py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-blue-soft mb-4">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/bootcamps" className="hover:text-white transition-colors">Bootcamps</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/bootcamps/${slug}`} className="hover:text-white transition-colors">
                {bootcamp.title}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Sessions</span>
            </nav>

            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-white/10 mb-4 -ml-2"
            >
              <Link href={`/bootcamps/${slug}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au programme
              </Link>
            </Button>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
              Choisissez votre session
            </h1>
            <p className="font-sans text-blue-pale">
              {bootcamp.title} - {bootcamp.duration}
            </p>
          </div>
        </section>

        {/* Sessions List */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sessions */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Sessions disponibles
                  </h2>
                  <p className="font-sans text-sm text-muted-foreground">
                    {sessions.length} session{sessions.length > 1 ? "s" : ""}
                  </p>
                </div>

                {sessions.length > 0 ? (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        id={session.id}
                        dateStart={session.dateStart}
                        dateEnd={session.dateEnd}
                        city={session.city}
                        format={session.format}
                        trainer={session.trainer}
                        spotsTotal={session.spotsTotal}
                        spotsRemaining={session.spotsRemaining}
                        status={session.status}
                        onSelect={handleSelectSession}
                        onNotify={handleNotify}
                        selected={selectedSession === session.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-secondary rounded-xl">
                    <p className="font-sans text-muted-foreground mb-4">
                      Aucune session disponible pour le moment.
                    </p>
                    <Button variant="outline">
                      Me notifier des prochaines dates
                    </Button>
                  </div>
                )}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                    Récapitulatif
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-sans text-muted-foreground">Bootcamp</span>
                      <span className="font-sans font-medium text-foreground text-right">
                        {bootcamp.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-muted-foreground">Durée</span>
                      <span className="font-sans text-foreground">{bootcamp.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-muted-foreground">Format</span>
                      <span className="font-sans text-foreground">{bootcamp.format}</span>
                    </div>
                    
                    {selectedSessionData && (
                      <>
                        <div className="border-t border-border pt-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-sans text-muted-foreground">Session</span>
                            <span className="font-sans font-medium text-violet">
                              {new Date(selectedSessionData.dateStart).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-sans text-muted-foreground">Lieu</span>
                            <span className="font-sans text-foreground">{selectedSessionData.city}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="font-sans text-muted-foreground">Total</span>
                      <div className="text-right">
                        <p className="font-serif text-2xl font-bold text-violet">
                          {bootcamp.price.toLocaleString('fr-FR')} FCFA
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">TTC</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={!selectedSession}
                    className="w-full bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white font-medium"
                  >
                    Continuer l&apos;inscription
                  </Button>

                  {!selectedSession && (
                    <p className="font-sans text-xs text-muted-foreground text-center mt-3">
                      Sélectionnez une session pour continuer
                    </p>
                  )}

                  {/* Trust Elements */}
                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield className="w-4 h-4 text-violet" />
                      <span className="font-sans text-xs">Paiement sécurisé</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-violet" />
                      <span className="font-sans text-xs">Satisfait ou remboursé sous 7 jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
