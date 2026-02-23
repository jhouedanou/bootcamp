"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-blue via-violet to-blue-bright relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <p className="font-sans text-gold font-medium tracking-wider uppercase mb-4">
              Contact
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              Parlons de votre projet
            </h1>
            <p className="font-sans text-lg md:text-xl text-blue-pale leading-relaxed max-w-2xl mx-auto">
              Une question sur nos bootcamps ? Besoin d&apos;un renseignement ?
              Notre equipe est la pour vous accompagner.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Envoyez-nous un message
                </h2>

                {submitted ? (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                        Message envoye !
                      </h3>
                      <p className="font-sans text-muted-foreground mb-6">
                        Merci pour votre message. Notre equipe vous repondra dans les 24 heures.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline">
                        Envoyer un autre message
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prenom *</Label>
                        <Input id="firstName" placeholder="Votre prenom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input id="lastName" placeholder="Votre nom" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telephone</Label>
                      <Input id="phone" type="tel" placeholder="+225 00 00 00 00 00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <select
                        id="subject"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      >
                        <option value="">Choisir un sujet</option>
                        <option value="bootcamp">Renseignement sur un bootcamp</option>
                        <option value="inscription">Inscription</option>
                        <option value="entreprise">Formation en entreprise</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        rows={5}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Decrivez votre demande..."
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white font-medium py-6"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Nos coordonnees
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: <MapPin className="w-6 h-6" />,
                      title: "Adresse",
                      content: "Abidjan, Cote d'Ivoire",
                      subtitle: "Cocody, Riviera",
                    },
                    {
                      icon: <Phone className="w-6 h-6" />,
                      title: "Telephone",
                      content: "+225 00 00 00 00 00",
                      subtitle: "Du lundi au vendredi",
                    },
                    {
                      icon: <Mail className="w-6 h-6" />,
                      title: "Email",
                      content: "contact@bigfive.ci",
                      subtitle: "Reponse sous 24h",
                    },
                    {
                      icon: <Clock className="w-6 h-6" />,
                      title: "Horaires",
                      content: "Lun - Ven : 8h00 - 18h00",
                      subtitle: "Sam : 9h00 - 13h00",
                    },
                  ].map((info) => (
                    <Card key={info.title}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-violet flex items-center justify-center flex-shrink-0">
                          <div className="text-white">{info.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{info.title}</h3>
                          <p className="text-sm text-foreground">{info.content}</p>
                          <p className="text-xs text-muted-foreground">{info.subtitle}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Map placeholder */}
                <Card className="overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-blue/10 to-violet/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-violet mx-auto mb-2" />
                      <p className="font-sans text-sm text-muted-foreground">
                        Abidjan, Cocody - Riviera
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
