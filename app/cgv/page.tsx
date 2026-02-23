import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function CGVPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-blue via-violet to-blue-bright">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Conditions Generales de Vente
            </h1>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 1 - Objet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les presentes Conditions Generales de Vente (CGV) regissent les relations entre Big Five Academy
                  et tout participant inscrit a l&apos;une de ses formations (bootcamps). Toute inscription
                  implique l&apos;acceptation sans reserve des presentes CGV.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 2 - Inscription</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>
                    L&apos;inscription a une formation est effective apres reception du paiement integral ou du premier
                    versement en cas de paiement echelonne. Une confirmation d&apos;inscription est envoyee par email
                    dans les 48 heures suivant le paiement.
                  </p>
                  <p>
                    Les places sont limitees et attribuees par ordre d&apos;inscription. Big Five Academy se reserve
                    le droit de refuser une inscription en cas de session complete.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 3 - Tarifs et paiement</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>
                    Les tarifs des formations sont indiques en Francs CFA (FCFA) et sont fixes au moment
                    de l&apos;inscription. Ils comprennent la formation, les supports de cours, les pauses-cafe
                    et le dejeuner pour les sessions en presentiel.
                  </p>
                  <p>
                    Le paiement s&apos;effectue par carte bancaire ou Mobile Money via notre plateforme de paiement
                    securisee. Un paiement en 2 ou 3 fois sans frais est possible pour les formations
                    de plus de 300 000 FCFA sur demande.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 4 - Annulation et remboursement</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p><strong className="text-foreground">Par le participant :</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Plus de 7 jours avant la formation : remboursement integral</li>
                    <li>Entre 7 et 3 jours : avoir valable 6 mois sur une prochaine session</li>
                    <li>Moins de 3 jours : aucun remboursement, report possible sous conditions</li>
                  </ul>
                  <p><strong className="text-foreground">Par Big Five Academy :</strong></p>
                  <p>
                    En cas d&apos;annulation d&apos;une session par Big Five Academy (nombre minimum de participants
                    non atteint, indisponibilite du formateur), le participant sera rembourse integralement
                    ou pourra reporter son inscription a une prochaine session.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 5 - Deroulement des formations</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>
                    Big Five Academy s&apos;engage a fournir les moyens necessaires au bon deroulement de la formation.
                    Le participant s&apos;engage a respecter le reglement interieur et a participer activement a la formation.
                  </p>
                  <p>
                    Les horaires de formation sont generalement de 9h00 a 17h00 avec une pause dejeuner d&apos;une heure.
                    Tout retard ou absence ne pourra donner lieu a un remboursement.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 6 - Propriete intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L&apos;ensemble des supports de formation (documents, presentations, videos) remis aux participants
                  sont la propriete de Big Five Academy. Ils sont destines a un usage personnel et ne peuvent
                  etre reproduits, diffuses ou utilises a des fins commerciales sans autorisation prealable ecrite.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 7 - Certificat de formation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Un certificat de formation Big Five Academy est delivre a chaque participant ayant suivi
                  l&apos;integralite de la formation. Ce certificat atteste de la participation et des competences
                  acquises durant le bootcamp.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Article 8 - Litiges</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les presentes CGV sont soumises au droit ivoirien. En cas de litige, les parties
                  s&apos;engagent a rechercher une solution amiable. A defaut, le litige sera porte devant
                  les tribunaux competents d&apos;Abidjan.
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
