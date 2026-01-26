import React from "react"
import Link from "next/link"
import { ArrowRight, Clock, Award, Users, Briefcase, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BootcampCard } from "@/components/bootcamp-card"
import { bootcamps } from "@/lib/data"

// Icons for bootcamps
const bootcampIcons: Record<string, React.ReactNode> = {
  "social-media-management-avance": <Users className="w-7 h-7" />,
  "marketing-digital-fondamentaux": <Briefcase className="w-7 h-7" />,
  "creation-contenu-video": <Star className="w-7 h-7" />,
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue via-violet to-blue-bright pt-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="font-sans text-gold font-medium tracking-wider uppercase mb-4 animate-fade-in">
                Big Five Academy
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 text-balance">
                Développez vos compétences digitales
              </h1>
              <p className="font-sans text-lg md:text-xl text-blue-pale leading-relaxed max-w-2xl mx-auto mb-8 text-pretty">
                Bootcamps intensifs de 2 jours pour les professionnels du digital. 
                Apprenez avec les meilleurs experts et transformez votre carrière.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-violet hover:bg-gold hover:text-blue-navy font-semibold px-8 py-6 text-lg transition-all duration-300"
                >
                  <Link href="/bootcamps">
                    Découvrir nos bootcamps
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-6 text-lg bg-transparent"
                >
                  <Link href="/a-propos">En savoir plus</Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "500+", label: "Professionnels formés" },
                  { value: "98%", label: "Taux de satisfaction" },
                  { value: "12", label: "Formateurs experts" },
                  { value: "3", label: "Bootcamps disponibles" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">{stat.value}</p>
                    <p className="font-sans text-sm text-blue-soft">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full" />
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Pourquoi choisir Big Five ?
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Une approche unique de la formation digitale, conçue pour des résultats concrets.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Format intensif 2 jours",
                  description: "Des formations concentrées pour un apprentissage efficace, sans interruption de votre activité.",
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Expertise terrain",
                  description: "Des formateurs actifs dans leur domaine, avec une expérience concrète du marché africain.",
                },
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: "Résultats concrets",
                  description: "70% de pratique. Vous repartez avec des compétences directement applicables.",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Réseau professionnel",
                  description: "Rejoignez une communauté de professionnels du digital en Côte d'Ivoire.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-violet/30 hover:shadow-lg hover:shadow-violet/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Bootcamps */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                  Nos bootcamps
                </h2>
                <p className="font-sans text-muted-foreground max-w-2xl leading-relaxed">
                  Des formations intensives conçues pour transformer votre expertise digitale en résultats mesurables.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-violet text-violet hover:bg-violet hover:text-white shrink-0 self-start lg:self-auto bg-transparent"
              >
                <Link href="/bootcamps">
                  Voir tous les bootcamps
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bootcamps.map((bootcamp, index) => (
                <BootcampCard
                  key={bootcamp.slug}
                  slug={bootcamp.slug}
                  title={bootcamp.title}
                  description={bootcamp.description}
                  duration={bootcamp.duration}
                  level={bootcamp.level}
                  format={bootcamp.format}
                  price={bootcamp.price}
                  icon={bootcampIcons[bootcamp.slug] || <Star className="w-7 h-7" />}
                  targets={bootcamp.targets}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Ce que disent nos participants
              </h2>
              <p className="font-sans text-muted-foreground">
                Découvrez les témoignages de professionnels qui ont transformé leur carrière.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  quote: "Le bootcamp Social Media a complètement transformé ma façon de travailler. J'ai pu appliquer les méthodes dès le lendemain dans mon entreprise.",
                  author: "Marie Kouassi",
                  role: "Responsable Communication, Orange CI",
                },
                {
                  quote: "Formation intensive mais très enrichissante. Les exercices pratiques m'ont permis de vraiment comprendre et maîtriser les outils.",
                  author: "Yao Adama",
                  role: "Community Manager Freelance",
                },
                {
                  quote: "Sarah est une formatrice exceptionnelle. Son expertise et sa pédagogie font toute la différence. Je recommande à 100%.",
                  author: "Fatou Diallo",
                  role: "Directrice Marketing, Jumia CI",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="p-6 rounded-xl bg-card border border-border"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-sans text-foreground leading-relaxed mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-serif font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="font-sans text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-blue via-violet to-blue-bright relative overflow-hidden">
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
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
                Prêt à laisser votre empreinte ?
              </h2>
              <p className="font-sans text-lg text-blue-pale leading-relaxed mb-8">
                Rejoignez les centaines de professionnels qui ont déjà transformé leur carrière 
                avec nos bootcamps intensifs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-blue-navy hover:bg-gold-bright font-semibold px-8 py-6 text-lg"
                >
                  <Link href="/bootcamps">
                    Choisir mon bootcamp
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-6 text-lg bg-transparent"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
