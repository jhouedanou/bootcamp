"use client"

import { useState } from "react"
import { 
  CreditCard,
  CheckCircle2,
  Calendar,
  Star,
  Zap,
  Building,
  AlertCircle,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { mockUser } from "@/lib/data"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price)
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    billingCycle: "gratuit",
    icon: Star,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    features: [
      "Accès aux vidéos d'introduction",
      "Support par email",
      "Newsletter mensuelle",
    ],
    notIncluded: [
      "Replay des sessions live",
      "Ressources téléchargeables",
      "Support prioritaire",
      "Communauté privée",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 25000,
    billingCycle: "mois",
    icon: Zap,
    color: "text-violet",
    bgColor: "bg-violet/10",
    popular: true,
    features: [
      "Accès illimité aux vidéos",
      "Replay des sessions live",
      "Ressources téléchargeables",
      "Support prioritaire",
      "Communauté privée",
    ],
    notIncluded: [
      "Formations en présentiel incluses",
      "Coaching personnalisé",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 150000,
    billingCycle: "mois",
    icon: Building,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
    features: [
      "Tout Premium inclus",
      "Formations en présentiel incluses",
      "Coaching personnalisé",
      "Accès équipe (5 membres)",
      "Reporting et analytics",
      "Account manager dédié",
    ],
    notIncluded: [],
  },
]

export default function AbonnementsPage() {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const currentSubscription = mockUser.subscriptions[0]

  const currentPlan = plans.find(p => p.id === currentSubscription?.plan)
  const daysRemaining = currentSubscription 
    ? Math.ceil((new Date(currentSubscription.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2">
          Mon abonnement
        </h1>
        <p className="text-muted-foreground">
          Gérez votre abonnement et accédez à vos avantages.
        </p>
      </div>

      {/* Current Subscription */}
      {currentSubscription && (
        <Card className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue to-violet" />
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Plan Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${currentPlan?.bgColor}`}>
                    {currentPlan && <currentPlan.icon className={`w-6 h-6 ${currentPlan.color}`} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-foreground">
                        Abonnement {currentSubscription.planName}
                      </h2>
                      <Badge className="bg-green-100 text-green-700">Actif</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(currentSubscription.price)} FCFA / {currentSubscription.billingCycle === "monthly" ? "mois" : "an"}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {currentSubscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Renewal Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-muted/50">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Prochain renouvellement le {formatDate(currentSubscription.endDate)} 
                    ({daysRemaining} jours restants)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 lg:w-48">
                <Button variant="outline" className="w-full bg-transparent">
                  Changer de plan
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Moyen de paiement
                </Button>
                <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                      Résilier
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Résilier votre abonnement</DialogTitle>
                      <DialogDescription>
                        Êtes-vous sûr de vouloir résilier votre abonnement Premium ?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 text-amber-900">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">Vous perdrez accès à :</p>
                          <ul className="list-disc list-inside space-y-1 opacity-90">
                            <li>Accès illimité aux vidéos</li>
                            <li>Replay des sessions live</li>
                            <li>Ressources téléchargeables</li>
                            <li>Communauté privée</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button variant="destructive" onClick={() => setCancelDialogOpen(false)}>
                        Confirmer la résiliation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-violet" />
            Historique de facturation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "2025-01-01", amount: 25000, status: "paid" },
              { date: "2024-12-01", amount: 25000, status: "paid" },
              { date: "2024-11-01", amount: 25000, status: "paid" },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Abonnement Premium - {formatDate(invoice.date)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(invoice.amount)} FCFA
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-700">Payé</Badge>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other Plans */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Nos autres offres
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentSubscription?.plan
            const Icon = plan.icon

            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden ${isCurrentPlan ? "border-violet border-2" : ""}`}
              >
                {plan.popular && !isCurrentPlan && (
                  <div className="absolute top-0 right-0 bg-violet text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Populaire
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Actuel
                  </div>
                )}
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${plan.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${plan.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-foreground">
                      {plan.price === 0 ? "Gratuit" : `${formatPrice(plan.price)} FCFA`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground"> / {plan.billingCycle}</span>
                    )}
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <p className="text-sm text-muted-foreground">
                        + {plan.features.length - 4} autres avantages
                      </p>
                    )}
                  </div>
                  <Button 
                    className={`w-full ${isCurrentPlan ? "" : "bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark"}`}
                    variant={isCurrentPlan ? "outline" : "default"}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "Plan actuel" : "Passer à ce plan"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
