"use client"

import React from "react"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronRight, ArrowLeft, CheckCircle, Shield, ExternalLink, Calendar, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getBootcampBySlug, getSessionById } from "@/lib/data"
import { cn } from "@/lib/utils"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const bootcampSlug = searchParams.get("bootcamp")
  const sessionId = searchParams.get("session")
  
  const bootcamp = bootcampSlug ? getBootcampBySlug(bootcampSlug) : null
  const session = sessionId ? getSessionById(sessionId) : null

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    civility: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    source: "",
    acceptTerms: false,
    newsletter: false,
  })

  if (!bootcamp || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-muted-foreground mb-4">
            Session non trouvée. Veuillez sélectionner une session valide.
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep1 = () => {
    return (
      formData.civility &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone
    )
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) {
      setStep(2)
    }
  }

  const DJAMO_PAYMENT_URL = "https://pay.djamo.com/2bqug"

  const handleProceedToPayment = () => {
    if (!formData.acceptTerms) {
      alert("Veuillez accepter les conditions générales de vente.")
      return
    }
    // Open Djamo payment link in a new tab
    window.open(DJAMO_PAYMENT_URL, "_blank", "noopener,noreferrer")
  }

  const steps = [
    { number: 1, label: "Informations" },
    { number: 2, label: "Paiement" },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 lg:pt-20 bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue to-violet py-6 lg:py-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-blue-soft mb-4">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/bootcamps" className="hover:text-white transition-colors">Bootcamps</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/bootcamps/${bootcampSlug}`} className="hover:text-white transition-colors">
                {bootcamp.title}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Inscription</span>
            </nav>

            <Button
              variant="ghost"
              asChild
              className="text-white hover:bg-white/10 mb-2 -ml-2"
            >
              <Link href={`/bootcamps/${bootcampSlug}/sessions`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux sessions
              </Link>
            </Button>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Inscription au bootcamp
            </h1>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="bg-secondary border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center gap-2 md:gap-4">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm transition-all",
                      step >= s.number
                        ? "bg-violet text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s.number ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-sans text-sm hidden md:block",
                      step >= s.number ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-8 md:w-16 h-0.5",
                        step > s.number ? "bg-violet" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <form onSubmit={handleStep1Submit}>
                    <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                      <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                        Vos informations
                      </h2>

                      <div className="space-y-6">
                        {/* Civility */}
                        <div>
                          <Label className="font-sans text-sm font-medium mb-2 block">
                            Civilité <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={formData.civility}
                            onValueChange={(value) => handleInputChange("civility", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mr">Monsieur</SelectItem>
                              <SelectItem value="mme">Madame</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Name */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="font-sans text-sm font-medium mb-2 block">
                              Prénom <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="font-sans text-sm font-medium mb-2 block">
                              Nom <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="font-sans text-sm font-medium mb-2 block">
                              Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="font-sans text-sm font-medium mb-2 block">
                              Téléphone <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+225 XX XX XX XX XX"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        {/* Professional */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="company" className="font-sans text-sm font-medium mb-2 block">
                              Entreprise
                            </Label>
                            <Input
                              id="company"
                              value={formData.company}
                              onChange={(e) => handleInputChange("company", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="position" className="font-sans text-sm font-medium mb-2 block">
                              Fonction
                            </Label>
                            <Input
                              id="position"
                              value={formData.position}
                              onChange={(e) => handleInputChange("position", e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Source */}
                        <div>
                          <Label className="font-sans text-sm font-medium mb-2 block">
                            Comment avez-vous connu Big Five ?
                          </Label>
                          <Select
                            value={formData.source}
                            onValueChange={(value) => handleInputChange("source", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="social">Réseaux sociaux</SelectItem>
                              <SelectItem value="search">Recherche Google</SelectItem>
                              <SelectItem value="referral">Bouche à oreille</SelectItem>
                              <SelectItem value="event">Événement</SelectItem>
                              <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <Button
                          type="submit"
                          disabled={!validateStep1()}
                          className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white px-8"
                        >
                          Continuer vers le paiement
                        </Button>
                      </div>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                    <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                      Paiement sécurisé via Djamo
                    </h2>

                    {/* Payment info */}
                    <div className="bg-secondary rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue to-violet flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-foreground">Paiement sécurisé</p>
                          <p className="font-sans text-sm text-muted-foreground">
                            Vous serez redirigé vers la plateforme Djamo
                          </p>
                        </div>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        En cliquant sur le bouton ci-dessous, vous serez redirigé vers la page de paiement sécurisée Djamo pour finaliser votre inscription. Vous pourrez payer par carte bancaire ou mobile money.
                      </p>
                    </div>

                    {/* Recap participant */}
                    <div className="bg-violet/5 rounded-xl p-5 mb-6 border border-violet/10">
                      <p className="font-sans text-sm font-medium text-violet mb-3">Vos informations</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-sans text-muted-foreground">Nom</span>
                          <p className="font-sans font-medium text-foreground">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <span className="font-sans text-muted-foreground">Email</span>
                          <p className="font-sans font-medium text-foreground">{formData.email}</p>
                        </div>
                        <div>
                          <span className="font-sans text-muted-foreground">Téléphone</span>
                          <p className="font-sans font-medium text-foreground">{formData.phone}</p>
                        </div>
                        {formData.company && (
                          <div>
                            <span className="font-sans text-muted-foreground">Entreprise</span>
                            <p className="font-sans font-medium text-foreground">{formData.company}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                        />
                        <Label htmlFor="terms" className="font-sans text-sm text-muted-foreground leading-relaxed cursor-pointer">
                          J&apos;accepte les{" "}
                          <Link href="/cgv" className="text-violet hover:underline">
                            conditions générales de vente
                          </Link>{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="font-sans text-sm text-muted-foreground leading-relaxed cursor-pointer">
                          Je souhaite recevoir les actualités et offres de Big Five
                        </Label>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button
                        onClick={handleProceedToPayment}
                        disabled={!formData.acceptTerms}
                        className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white px-8"
                      >
                        Payer via Djamo
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
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
                    <div>
                      <p className="font-serif font-semibold text-foreground">
                        {bootcamp.title}
                      </p>
                      <p className="font-sans text-sm text-muted-foreground">
                        {bootcamp.duration} - {bootcamp.format}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-violet" />
                        <span className="font-sans text-foreground">
                          {formatDateRange(session.dateStart, session.dateEnd)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-violet" />
                        <span className="font-sans text-foreground">{session.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-violet" />
                        <span className="font-sans text-foreground">Animé par {session.trainer}</span>
                      </div>
                    </div>
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

                  {/* Trust Elements */}
                  <div className="pt-4 border-t border-border space-y-3">
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-muted-foreground">Chargement...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
