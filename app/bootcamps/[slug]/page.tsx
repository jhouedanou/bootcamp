import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Clock, 
  GraduationCap, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Target,
  BookOpen,
  Award,
  Gift,
  HelpCircle,
  ChevronRight,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { bootcamps, getBootcampBySlug, getSessionsByBootcamp } from "@/lib/data"

export function generateStaticParams() {
  return bootcamps.map((bootcamp) => ({
    slug: bootcamp.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BootcampDetailPage({ params }: PageProps) {
  const { slug } = await params
  const bootcamp = getBootcampBySlug(slug)
  
  if (!bootcamp) {
    notFound()
  }

  const sessions = getSessionsByBootcamp(slug)
  const nextSession = sessions.find((s) => s.status !== "full")

  const levelColors = {
    "Débutant": "bg-blue-pale text-blue-deep",
    "Intermédiaire": "bg-gold-light text-gold-dark",
    "Avancé": "bg-violet/10 text-violet",
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue via-violet to-blue-bright py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="hero-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-blue-soft mb-6">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/bootcamps" className="hover:text-white transition-colors">Bootcamps</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{bootcamp.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
                  {bootcamp.title}
                </h1>
                <p className="font-sans text-xl text-gold font-medium mb-6">
                  {bootcamp.tagline}
                </p>
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <Badge className={`${levelColors[bootcamp.level]} border-0 px-3 py-1`}>
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {bootcamp.level}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0 px-3 py-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {bootcamp.duration} ({bootcamp.hours}h)
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0 px-3 py-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {bootcamp.format}
                  </Badge>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-blue-navy hover:bg-gold-bright font-semibold px-8"
                >
                  <Link href={`/bootcamps/${slug}/sessions`}>
                    Choisir ma session
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Price Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <p className="font-sans text-sm text-blue-pale mb-1">À partir de</p>
                  <p className="font-serif text-4xl md:text-5xl font-bold text-white">
                    {bootcamp.price.toLocaleString('fr-FR')}
                    <span className="text-xl font-medium ml-2">FCFA</span>
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {bootcamp.includes.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center gap-3 text-blue-pale">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                      <span className="font-sans text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {nextSession && (
                  <div className="border-t border-white/20 pt-6">
                    <p className="font-sans text-sm text-blue-pale mb-2">Prochaine session</p>
                    <p className="font-serif text-lg font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gold" />
                      {new Date(nextSession.dateStart).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="font-sans text-sm text-blue-soft mt-1">
                      {nextSession.spotsRemaining} place{nextSession.spotsRemaining > 1 ? 's' : ''} restante{nextSession.spotsRemaining > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Context Section */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Pourquoi ce bootcamp ?
                </h2>
              </div>
              <p className="font-sans text-muted-foreground leading-relaxed text-lg">
                {bootcamp.description}
              </p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ce que vous saurez faire
              </h2>
              <p className="font-sans text-muted-foreground">
                À l&apos;issue de ce bootcamp, vous aurez acquis des compétences concrètes et directement applicables.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {bootcamp.outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue to-violet flex items-center justify-center shrink-0">
                    <span className="font-serif font-bold text-white">{index + 1}</span>
                  </div>
                  <p className="font-sans text-foreground leading-relaxed">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                    Ce bootcamp est fait pour vous si...
                  </h2>
                </div>
                <div className="space-y-4">
                  {bootcamp.targets.map((target) => (
                    <div key={target} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-violet shrink-0" />
                      <span className="font-sans text-foreground">{target}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gold-dark" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                    Prérequis
                  </h2>
                </div>
                <div className="space-y-4">
                  {bootcamp.prerequisites.map((prereq) => (
                    <div key={prereq} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gold-dark shrink-0" />
                      <span className="font-sans text-foreground">{prereq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Programme détaillé
              </h2>
              <p className="font-sans text-muted-foreground">
                Un programme intensif sur {bootcamp.duration}, conçu pour maximiser votre apprentissage.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {bootcamp.program.map((day) => (
                <div key={day.day} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="bg-gradient-to-r from-blue to-violet p-6">
                    <h3 className="font-serif text-xl font-bold text-white">
                      Jour {day.day}: {day.title}
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {day.modules.map((module) => (
                      <div key={module.title} className="border-l-4 border-violet pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-serif font-semibold text-foreground">
                            {module.title}
                          </h4>
                          <Badge variant="secondary" className="bg-violet/10 text-violet">
                            {module.duration}
                          </Badge>
                        </div>
                        <ul className="space-y-1">
                          {module.topics.map((topic) => (
                            <li key={topic} className="font-sans text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-violet/50" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Notre méthodologie
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {bootcamp.methodology.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
                  >
                    <CheckCircle className="w-5 h-5 text-violet shrink-0" />
                    <span className="font-sans text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trainer */}
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Votre formateur
              </h2>

              <div className="bg-card rounded-2xl border border-border p-8 lg:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue to-violet flex items-center justify-center shrink-0">
                    <span className="font-serif text-4xl font-bold text-white">
                      {bootcamp.trainer.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                      {bootcamp.trainer.name}
                    </h3>
                    <p className="font-sans text-violet font-medium mb-4">
                      {bootcamp.trainer.title}
                    </p>
                    <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                      {bootcamp.trainer.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {bootcamp.trainer.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-violet/10 text-violet">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Ce qui est inclus
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {bootcamp.includes.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
                  >
                    <CheckCircle className="w-5 h-5 text-gold-dark shrink-0" />
                    <span className="font-sans text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Questions fréquentes
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {bootcamp.faq.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6"
                  >
                    <AccordionTrigger className="font-serif font-semibold text-foreground hover:text-violet text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue via-violet to-blue-bright relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="cta-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M0 25 L50 25 M25 0 L25 50" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Prêt à transformer vos compétences ?
              </h2>
              <p className="font-sans text-lg text-blue-pale mb-8">
                Rejoignez notre prochaine session et passez au niveau supérieur.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-blue-navy hover:bg-gold-bright font-semibold px-8"
                >
                  <Link href={`/bootcamps/${slug}/sessions`}>
                    Choisir ma session
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-white">
                    {bootcamp.price.toLocaleString('fr-FR')} FCFA
                  </p>
                  <p className="font-sans text-sm text-blue-soft">Formation complète</p>
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
