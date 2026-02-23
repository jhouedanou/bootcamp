import Link from "next/link"
import { ArrowRight, Target, Heart, Lightbulb, Users, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function AProposPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-blue via-violet to-blue-bright relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="about-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-pattern)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <p className="font-sans text-gold font-medium tracking-wider uppercase mb-4">
              Qui sommes-nous
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              Big Five Academy
            </h1>
            <p className="font-sans text-lg md:text-xl text-blue-pale leading-relaxed max-w-2xl mx-auto">
              Agence de strategie digitale et de formation basee a Abidjan.
              Nous accompagnons les professionnels dans leur transformation digitale.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Notre mission
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  Big Five Academy est nee de la conviction que la transformation digitale en Afrique
                  passe par la formation de professionnels competents et passionnes.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  Nous proposons des bootcamps intensifs de 2 jours, conçus pour delivrer un maximum
                  de valeur en un minimum de temps. Notre approche : 70% de pratique, 30% de theorie.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Chaque formation est animee par des experts actifs dans leur domaine, avec une
                  experience concrete du marche africain et des defis specifiques de la region.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Professionnels formes" },
                  { value: "98%", label: "Taux de satisfaction" },
                  { value: "12", label: "Formateurs experts" },
                  { value: "3", label: "Bootcamps disponibles" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue/5 to-violet/5 border border-blue/10 text-center"
                  >
                    <p className="font-serif text-3xl font-bold text-violet mb-1">{stat.value}</p>
                    <p className="font-sans text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos valeurs
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Les principes qui guident chacune de nos formations et accompagnements.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Excellence",
                  description: "Nous visons l'excellence dans chaque formation, avec des contenus constamment mis a jour et des formateurs de premier plan.",
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Passion",
                  description: "Notre equipe est passionnee par le digital et par la transmission. Cette energie se ressent dans chaque session.",
                },
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: "Innovation",
                  description: "Nous integrons les dernieres tendances et outils pour que nos formations soient toujours a la pointe.",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Communaute",
                  description: "Nous creons une communaute de professionnels du digital qui se soutiennent et evoluent ensemble.",
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Afrique d'abord",
                  description: "Nos formations sont pensees pour le contexte africain, avec des cas pratiques et des exemples locaux.",
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Impact",
                  description: "Nous mesurons notre succes a l'impact concret de nos formations sur la carriere de nos participants.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-violet/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <div className="text-white">{value.icon}</div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Notre equipe de formateurs
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Des experts actifs dans leur domaine, avec une experience concrète du marche africain.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Kone",
                  title: "Experte Social Media & Digital Strategist",
                  bio: "Plus de 10 ans d'experience en strategie digitale. Accompagne les grandes marques africaines dans leur transformation digitale.",
                  expertise: ["Strategie Social Media", "Analytics & Data", "Content Strategy"],
                },
                {
                  name: "Jean-Marc Diallo",
                  title: "Consultant Marketing Digital",
                  bio: "15 ans d'experience en marketing digital. Formateur certifie Google et Meta. A accompagne plus de 100 entreprises.",
                  expertise: ["SEO/SEA", "Marketing Automation", "Growth Hacking"],
                },
                {
                  name: "Awa Toure",
                  title: "Creatrice de contenu & Vidéaste",
                  bio: "Creatrice de contenu avec plus de 500K followers. Specialisee dans la creation de contenu viral pour les marques africaines.",
                  expertise: ["Creation video mobile", "TikTok & Reels", "Personal Branding"],
                },
              ].map((trainer) => (
                <div key={trainer.name} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue to-violet mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {trainer.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                    {trainer.name}
                  </h3>
                  <p className="font-sans text-sm text-violet font-medium mb-3">
                    {trainer.title}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {trainer.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="text-xs px-3 py-1 rounded-full bg-violet/10 text-violet font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-blue via-violet to-blue-bright">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
              Pret a rejoindre l&apos;aventure ?
            </h2>
            <p className="font-sans text-lg text-blue-pale leading-relaxed max-w-2xl mx-auto mb-8">
              Decouvrez nos bootcamps et commencez votre transformation digitale des aujourd&apos;hui.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gold text-blue-navy hover:bg-gold-bright font-semibold px-8 py-6 text-lg"
              >
                <Link href="/bootcamps">
                  Voir nos bootcamps
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
        </section>
      </main>
      <Footer />
    </>
  )
}
