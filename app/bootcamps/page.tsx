"use client"

import React from "react"

import { useState } from "react"
import { Users, Briefcase, Star, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BootcampCard } from "@/components/bootcamp-card"
import { bootcamps } from "@/lib/data"
import { cn } from "@/lib/utils"

const bootcampIcons: Record<string, React.ReactNode> = {
  "social-media-management-avance": <Users className="w-7 h-7" />,
  "marketing-digital-fondamentaux": <Briefcase className="w-7 h-7" />,
  "creation-contenu-video": <Star className="w-7 h-7" />,
}

const levels = ["Tous", "Débutant", "Intermédiaire", "Avancé"] as const
const formats = ["Tous", "Présentiel", "Hybride", "En ligne"] as const

export default function BootcampsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("Tous")
  const [selectedFormat, setSelectedFormat] = useState<string>("Tous")
  const [showFilters, setShowFilters] = useState(false)

  const filteredBootcamps = bootcamps.filter((bootcamp) => {
    const levelMatch = selectedLevel === "Tous" || bootcamp.level === selectedLevel
    const formatMatch = selectedFormat === "Tous" || bootcamp.format === selectedFormat
    return levelMatch && formatMatch
  })

  const hasActiveFilters = selectedLevel !== "Tous" || selectedFormat !== "Tous"

  const clearFilters = () => {
    setSelectedLevel("Tous")
    setSelectedFormat("Tous")
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue via-violet to-blue-bright py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Nos Bootcamps
              </h1>
              <p className="font-sans text-lg text-blue-pale leading-relaxed">
                Formations intensives de 2 jours conçues pour les professionnels du digital. 
                Choisissez le bootcamp qui correspond à vos objectifs et transformez vos compétences.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Filter Toggle (Mobile) */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtres
                </span>
                {hasActiveFilters && (
                  <Badge className="bg-violet text-white">
                    {(selectedLevel !== "Tous" ? 1 : 0) + (selectedFormat !== "Tous" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Filters */}
            <div
              className={cn(
                "lg:flex lg:items-center lg:justify-between gap-6 mb-8 p-4 lg:p-0 rounded-xl bg-secondary lg:bg-transparent",
                showFilters ? "block" : "hidden lg:flex"
              )}
            >
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Level Filter */}
                <div>
                  <p className="font-sans text-sm font-medium text-muted-foreground mb-2">Niveau</p>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={cn(
                          "px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all",
                          selectedLevel === level
                            ? "bg-violet text-white"
                            : "bg-card border border-border text-foreground hover:border-violet/50"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Filter */}
                <div>
                  <p className="font-sans text-sm font-medium text-muted-foreground mb-2">Format</p>
                  <div className="flex flex-wrap gap-2">
                    {formats.map((format) => (
                      <button
                        type="button"
                        key={format}
                        onClick={() => setSelectedFormat(format)}
                        className={cn(
                          "px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all",
                          selectedFormat === format
                            ? "bg-blue text-white"
                            : "bg-card border border-border text-foreground hover:border-blue/50"
                        )}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground mt-4 lg:mt-0"
                >
                  <X className="w-4 h-4 mr-1" />
                  Réinitialiser
                </Button>
              )}
            </div>

            {/* Results */}
            <div className="mb-6">
              <p className="font-sans text-sm text-muted-foreground">
                {filteredBootcamps.length} bootcamp{filteredBootcamps.length > 1 ? "s" : ""} disponible{filteredBootcamps.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Bootcamp Grid */}
            {filteredBootcamps.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBootcamps.map((bootcamp, index) => (
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
            ) : (
              <div className="text-center py-16">
                <p className="font-sans text-muted-foreground mb-4">
                  Aucun bootcamp ne correspond à vos critères.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Besoin d&apos;aide pour choisir ?
              </h2>
              <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                Notre équipe est là pour vous guider vers le bootcamp le plus adapté à vos objectifs et à votre niveau.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark text-white"
              >
                <a href="/contact">Nous contacter</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
