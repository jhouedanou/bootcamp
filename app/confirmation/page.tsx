"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Calendar, MapPin, User, Mail, ArrowRight, Share2, Download, Phone, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getBootcampBySlug, getSessionById } from "@/lib/data"

interface OrderData {
  participant: {
    civility: string
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    position: string
  }
  bootcamp: {
    slug: string
    title: string
    price: number
    duration: string
    format: string
  }
  session: {
    id: string
    dateStart: string
    dateEnd: string
    city: string
    trainer: string
    format: string
  }
  orderedAt: string
  newsletter: boolean
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  
  const bootcampSlug = searchParams.get("bootcamp")
  const sessionId = searchParams.get("session")
  
  const bootcamp = bootcampSlug ? getBootcampBySlug(bootcampSlug) : null
  const session = sessionId ? getSessionById(sessionId) : null

  // Récupérer les données de commande sauvegardées lors du checkout
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  
  useEffect(() => {
    const stored = localStorage.getItem("bf_pending_order")
    if (stored) {
      try {
        const data: OrderData = JSON.parse(stored)
        setOrderData(data)
        // Déplacer vers les commandes confirmées et nettoyer
        const confirmedOrders = JSON.parse(localStorage.getItem("bf_confirmed_orders") || "[]")
        confirmedOrders.push({ ...data, confirmedAt: new Date().toISOString() })
        localStorage.setItem("bf_confirmed_orders", JSON.stringify(confirmedOrders))
        localStorage.removeItem("bf_pending_order")
      } catch {
        // Ignorer les erreurs de parsing
      }
    }
  }, [])

  if (!bootcamp || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-muted-foreground mb-4">
            Information de réservation non trouvée.
          </p>
          <Button asChild>
            <Link href="/bootcamps">Voir les bootcamps</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const startDay = startDate.getDate()
    const endDay = endDate.getDate()
    const month = endDate.toLocaleDateString('fr-FR', { month: 'long' })
    const year = endDate.getFullYear()
    
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDay}-${endDay} ${month} ${year}`
    }
    return `${startDate.toLocaleDateString('fr-FR')} - ${endDate.toLocaleDateString('fr-FR')}`
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 lg:pt-20 bg-background">
        {/* Success Header */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-blue via-violet to-blue-bright relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="conf-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#conf-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              {/* Animated Checkmark */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center animate-bounce">
                <CheckCircle className="w-12 h-12 text-violet" />
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Inscription confirmée !
              </h1>
              <p className="font-sans text-lg text-blue-pale">
                Félicitations ! Votre place est réservée pour le bootcamp.
              </p>
            </div>
          </div>
        </section>

        {/* Confirmation Details */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {/* Email Notice */}
              <div className="bg-blue-pale/30 border border-blue-soft/30 rounded-xl p-4 mb-8 flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm text-foreground">
                    {orderData?.participant?.email ? (
                      <>Un email de confirmation sera envoyé à <strong>{orderData.participant.email}</strong> avec tous les détails de votre inscription.</>
                    ) : (
                      <>Un email de confirmation a été envoyé à votre adresse email avec tous les détails de votre inscription.</>
                    )}
                  </p>
                </div>
              </div>

              {/* Payment Notice */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 mb-8 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                    Paiement en cours de vérification
                  </p>
                  <p className="font-sans text-xs text-amber-700 dark:text-amber-400">
                    Votre paiement via Djamo sera vérifié par notre équipe. Vous recevrez une confirmation définitive par email sous 24h. En cas de problème, contactez-nous.
                  </p>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue to-violet p-6">
                  <h2 className="font-serif text-xl font-bold text-white">
                    Récapitulatif de votre réservation
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      {bootcamp.title}
                    </h3>
                    <p className="font-sans text-muted-foreground">
                      {bootcamp.duration} - {bootcamp.format} - {bootcamp.level}
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-violet" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Date</p>
                        <p className="font-sans font-medium text-foreground">
                          {formatDateRange(session.dateStart, session.dateEnd)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-violet" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Lieu</p>
                        <p className="font-sans font-medium text-foreground">
                          {session.city} - {session.format}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-violet" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Formateur</p>
                        <p className="font-sans font-medium text-foreground">
                          {session.trainer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-end">
                      <span className="font-sans text-muted-foreground">Montant payé</span>
                      <p className="font-serif text-2xl font-bold text-violet">
                        {bootcamp.price.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                  </div>

                  {/* Participant info from localStorage */}
                  {orderData?.participant && (
                    <div className="border-t border-border pt-4 mt-4">
                      <p className="font-sans text-sm font-medium text-muted-foreground mb-3">Participant</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-violet" />
                          <span className="font-sans text-sm text-foreground">
                            {orderData.participant.civility === "mr" ? "M." : "Mme"} {orderData.participant.firstName} {orderData.participant.lastName}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-violet" />
                          <span className="font-sans text-sm text-foreground">{orderData.participant.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-violet" />
                          <span className="font-sans text-sm text-foreground">{orderData.participant.phone}</span>
                        </div>
                        {orderData.participant.company && (
                          <div className="flex items-center gap-3">
                            <Building className="w-4 h-4 text-violet" />
                            <span className="font-sans text-sm text-foreground">
                              {orderData.participant.company}{orderData.participant.position ? ` — ${orderData.participant.position}` : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-card rounded-2xl border border-border p-6 mb-8">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                  Prochaines étapes
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-serif text-xs font-bold text-violet">1</span>
                    </div>
                    <div>
                      <p className="font-sans font-medium text-foreground">Vérifiez votre email</p>
                      <p className="font-sans text-sm text-muted-foreground">
                        Vous recevrez un email avec votre confirmation et les détails pratiques.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-serif text-xs font-bold text-violet">2</span>
                    </div>
                    <div>
                      <p className="font-sans font-medium text-foreground">Préparez-vous</p>
                      <p className="font-sans text-sm text-muted-foreground">
                        Quelques jours avant le bootcamp, vous recevrez un email avec les instructions et prérequis.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-serif text-xs font-bold text-violet">3</span>
                    </div>
                    <div>
                      <p className="font-sans font-medium text-foreground">Rejoignez-nous</p>
                      <p className="font-sans text-sm text-muted-foreground">
                        Le jour J, présentez-vous à l&apos;heure indiquée avec votre ordinateur portable.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-violet text-violet hover:bg-violet/5 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger la confirmation
                </Button>
                <Button variant="outline" className="border-violet text-violet hover:bg-violet/5 bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>

              {/* Contact */}
              <div className="mt-12 text-center">
                <p className="font-sans text-muted-foreground mb-4">
                  Des questions ? Notre équipe est là pour vous aider.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white"
                  >
                    <Link href="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/bootcamps">
                      Découvrir d&apos;autres bootcamps
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
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

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-muted-foreground">Chargement...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
