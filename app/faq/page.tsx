import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqCategories = [
  {
    title: "Nos formations",
    questions: [
      {
        question: "Combien de temps durent les bootcamps ?",
        answer: "Nos bootcamps sont des formations intensives de 2 jours (14 heures au total). Ils se deroulent generalement le samedi et le dimanche pour ne pas impacter votre activite professionnelle.",
      },
      {
        question: "Quel est le format des formations ?",
        answer: "Nos formations suivent une approche 70% pratique, 30% theorie. Vous travaillez sur des cas concrets, vos propres projets, et repartez avec des competences directement applicables.",
      },
      {
        question: "Combien de participants par session ?",
        answer: "Les groupes sont limites a 12 participants maximum pour garantir un accompagnement personnalise et permettre des echanges de qualite avec le formateur.",
      },
      {
        question: "Un certificat est-il delivre ?",
        answer: "Oui, un certificat de formation Big Five Academy est remis a chaque participant ayant complete l'integralite du bootcamp.",
      },
      {
        question: "Y a-t-il un suivi apres la formation ?",
        answer: "Oui, vous beneficiez d'un acces a notre communaute privee et d'un suivi de 30 jours par email avec votre formateur pour poser vos questions.",
      },
    ],
  },
  {
    title: "Inscription et paiement",
    questions: [
      {
        question: "Comment s'inscrire a un bootcamp ?",
        answer: "Rendez-vous sur la page du bootcamp qui vous interesse, choisissez une session et cliquez sur 'S'inscrire'. Remplissez le formulaire et procedez au paiement pour valider votre inscription.",
      },
      {
        question: "Quels sont les moyens de paiement acceptes ?",
        answer: "Nous acceptons les paiements par carte bancaire et Mobile Money (Orange Money, MTN Money, Wave) via notre partenaire de paiement securise Djamo.",
      },
      {
        question: "Puis-je payer en plusieurs fois ?",
        answer: "Oui, nous proposons un paiement en 2 ou 3 fois sans frais pour les formations de plus de 300 000 FCFA. Contactez-nous pour mettre en place un echeancier.",
      },
      {
        question: "Quelle est la politique d'annulation ?",
        answer: "Vous pouvez annuler votre inscription jusqu'a 7 jours avant le debut de la formation pour un remboursement integral. Entre 7 et 3 jours, un avoir vous sera propose. Moins de 3 jours, aucun remboursement n'est possible mais vous pouvez reporter a une session ulterieure.",
      },
      {
        question: "Les entreprises peuvent-elles inscrire leurs employes ?",
        answer: "Absolument ! Nous proposons des tarifs preferentiels pour les inscriptions groupees (3 personnes ou plus). Contactez-nous pour un devis personnalise.",
      },
    ],
  },
  {
    title: "Logistique et pratique",
    questions: [
      {
        question: "Ou se deroulent les formations ?",
        answer: "Nos formations en presentiel se deroulent a Abidjan, dans des espaces de coworking modernes et bien equipes. L'adresse exacte vous sera communiquee par email apres votre inscription.",
      },
      {
        question: "Que dois-je apporter ?",
        answer: "Votre ordinateur portable est indispensable. Selon la formation, vous pourrez aussi avoir besoin de votre smartphone. Les details sont precises sur la page de chaque bootcamp.",
      },
      {
        question: "Les repas sont-ils inclus ?",
        answer: "Oui, les pauses-cafe et le dejeuner sont inclus dans le prix de la formation pour les sessions en presentiel.",
      },
      {
        question: "Y a-t-il un parking disponible ?",
        answer: "Oui, un parking gratuit est disponible sur les lieux de formation. Les details d'acces vous seront envoyes avant la session.",
      },
    ],
  },
  {
    title: "Espace personnel et videos",
    questions: [
      {
        question: "Comment acceder a mon espace personnel ?",
        answer: "Apres votre inscription, vous recevez vos identifiants par email. Connectez-vous via le bouton 'Mon espace' en haut du site pour acceder a vos formations, videos et certificats.",
      },
      {
        question: "Les videos sont-elles accessibles apres la formation ?",
        answer: "Oui, les replays des sessions sont disponibles dans votre espace personnel pendant 6 mois apres la formation (12 mois pour les abonnes Premium).",
      },
      {
        question: "Puis-je telecharger les supports de cours ?",
        answer: "Oui, tous les supports de cours (PDF, templates, checklists) sont telechargables depuis votre espace personnel.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-blue via-violet to-blue-bright">
          <div className="container mx-auto px-4 text-center">
            <p className="font-sans text-gold font-medium tracking-wider uppercase mb-4">
              FAQ
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              Questions frequentes
            </h1>
            <p className="font-sans text-lg md:text-xl text-blue-pale leading-relaxed max-w-2xl mx-auto">
              Retrouvez les reponses aux questions les plus frequemment posees
              sur nos bootcamps et nos services.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              {faqCategories.map((category) => (
                <div key={category.title}>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.title}-${index}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-medium hover:text-violet">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center p-8 rounded-xl bg-gradient-to-r from-blue/5 to-violet/5 border border-blue/10">
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Vous ne trouvez pas votre reponse ?
              </h3>
              <p className="font-sans text-muted-foreground mb-6">
                Notre equipe est disponible pour repondre a toutes vos questions.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white"
              >
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
