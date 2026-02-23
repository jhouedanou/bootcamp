import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function MentionsLegalesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-blue via-violet to-blue-bright">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Mentions legales
            </h1>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl prose prose-gray">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Editeur du site</h2>
                <div className="text-muted-foreground space-y-2">
                  <p><strong className="text-foreground">Raison sociale :</strong> Big Five Academy</p>
                  <p><strong className="text-foreground">Forme juridique :</strong> SARL</p>
                  <p><strong className="text-foreground">Siege social :</strong> Abidjan, Cocody - Riviera, Cote d&apos;Ivoire</p>
                  <p><strong className="text-foreground">Telephone :</strong> +225 00 00 00 00 00</p>
                  <p><strong className="text-foreground">Email :</strong> contact@bigfive.ci</p>
                  <p><strong className="text-foreground">Directeur de la publication :</strong> Big Five Academy</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Hebergement</h2>
                <div className="text-muted-foreground space-y-2">
                  <p><strong className="text-foreground">Hebergeur :</strong> Vercel Inc.</p>
                  <p><strong className="text-foreground">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Propriete intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L&apos;ensemble du contenu de ce site (textes, images, videos, logos, icones) est protege par le droit
                  d&apos;auteur et est la propriete exclusive de Big Five Academy, sauf mention contraire.
                  Toute reproduction, representation, modification ou exploitation de tout ou partie du contenu
                  de ce site, par quelque procede que ce soit, sans l&apos;autorisation prealable et ecrite de
                  Big Five Academy est interdite et constitue une contrefacon.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Responsabilite</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Big Five Academy s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusees sur ce site.
                  Toutefois, elle ne peut garantir l&apos;exactitude, la completude et l&apos;actualite des informations
                  mises a disposition. Big Five Academy decline toute responsabilite pour les eventuels dommages
                  directs ou indirects resultant de l&apos;acces au site ou de l&apos;utilisation des informations qu&apos;il contient.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Liens hypertextes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site peut contenir des liens vers d&apos;autres sites internet. Big Five Academy n&apos;exerce aucun
                  controle sur le contenu de ces sites tiers et decline toute responsabilite quant a leur contenu.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les presentes mentions legales sont soumises au droit ivoirien. Tout litige relatif a
                  l&apos;utilisation du site sera de la competence exclusive des tribunaux d&apos;Abidjan.
                </p>
              </div>

              <p className="text-sm text-muted-foreground pt-4 border-t">
                Derniere mise a jour : Fevrier 2026
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
