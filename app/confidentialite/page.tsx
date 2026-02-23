import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ConfidentialitePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-blue via-violet to-blue-bright">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Politique de Confidentialite
            </h1>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Big Five Academy s&apos;engage a proteger la vie privee de ses utilisateurs. La presente politique
                  de confidentialite decrit comment nous collectons, utilisons et protegeons vos donnees personnelles
                  lorsque vous utilisez notre site web et nos services de formation.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">2. Donnees collectees</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>Nous collectons les donnees suivantes :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong className="text-foreground">Donnees d&apos;identite :</strong> nom, prenom, civilite</li>
                    <li><strong className="text-foreground">Coordonnees :</strong> adresse email, numero de telephone</li>
                    <li><strong className="text-foreground">Donnees professionnelles :</strong> entreprise, poste occupe</li>
                    <li><strong className="text-foreground">Donnees de navigation :</strong> adresse IP, type de navigateur, pages visitees</li>
                    <li><strong className="text-foreground">Donnees de formation :</strong> inscriptions, progression, certifications</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Finalites du traitement</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>Vos donnees sont utilisees pour :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Gerer votre inscription et votre acces aux formations</li>
                    <li>Assurer le suivi pedagogique et delivrer les certificats</li>
                    <li>Vous envoyer des informations sur nos formations (avec votre consentement)</li>
                    <li>Ameliorer nos services et notre site web</li>
                    <li>Traiter les paiements de maniere securisee</li>
                    <li>Repondre a vos demandes de contact</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">4. Base legale du traitement</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>Le traitement de vos donnees repose sur :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong className="text-foreground">L&apos;execution du contrat :</strong> pour gerer votre inscription et delivrer la formation</li>
                    <li><strong className="text-foreground">Votre consentement :</strong> pour l&apos;envoi de communications marketing</li>
                    <li><strong className="text-foreground">L&apos;interet legitime :</strong> pour ameliorer nos services</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">5. Partage des donnees</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vos donnees ne sont jamais vendues a des tiers. Elles peuvent etre partagees avec :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground mt-2">
                  <li>Notre prestataire de paiement (Djamo) pour le traitement securise des paiements</li>
                  <li>Notre hebergeur (Vercel) pour l&apos;hebergement du site</li>
                  <li>Nos formateurs, uniquement pour les donnees necessaires au suivi pedagogique</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">6. Duree de conservation</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>Vos donnees sont conservees pour les durees suivantes :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Donnees de compte : pendant la duree de votre compte + 3 ans</li>
                    <li>Donnees de formation : 5 ans apres la derniere formation</li>
                    <li>Donnees de facturation : 10 ans (obligation legale)</li>
                    <li>Cookies de navigation : 13 mois maximum</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">7. Vos droits</h2>
                <div className="text-muted-foreground space-y-3 leading-relaxed">
                  <p>Conformement a la reglementation, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong className="text-foreground">Droit d&apos;acces :</strong> obtenir une copie de vos donnees</li>
                    <li><strong className="text-foreground">Droit de rectification :</strong> corriger vos donnees inexactes</li>
                    <li><strong className="text-foreground">Droit de suppression :</strong> demander l&apos;effacement de vos donnees</li>
                    <li><strong className="text-foreground">Droit d&apos;opposition :</strong> vous opposer au traitement de vos donnees</li>
                    <li><strong className="text-foreground">Droit a la portabilite :</strong> recevoir vos donnees dans un format structure</li>
                  </ul>
                  <p>
                    Pour exercer vos droits, contactez-nous a : <strong className="text-foreground">contact@bigfive.ci</strong>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">8. Securite</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour
                  proteger vos donnees personnelles contre tout acces non autorise, modification, divulgation
                  ou destruction. Les paiements sont traites de maniere securisee par notre partenaire Djamo.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">9. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Notre site utilise des cookies essentiels au fonctionnement du site et des cookies
                  d&apos;analyse (Vercel Analytics) pour comprendre comment vous utilisez notre site et
                  ameliorer votre experience. Vous pouvez configurer votre navigateur pour refuser les cookies.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">10. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question relative a cette politique de confidentialite ou au traitement
                  de vos donnees personnelles, contactez-nous a :
                </p>
                <div className="mt-3 p-4 rounded-lg bg-muted/50 text-muted-foreground">
                  <p>Big Five Academy</p>
                  <p>Email : contact@bigfive.ci</p>
                  <p>Telephone : +225 00 00 00 00 00</p>
                  <p>Adresse : Abidjan, Cocody - Riviera, Cote d&apos;Ivoire</p>
                </div>
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
