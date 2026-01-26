import { notFound } from "next/navigation"
import { bootcamps, getBootcampBySlug, getSessionsByBootcamp } from "@/lib/data"
import { SessionsClient } from "./sessions-client"

export function generateStaticParams() {
  return bootcamps.map((bootcamp) => ({
    slug: bootcamp.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function SessionsPage({ params }: PageProps) {
  const { slug } = await params
  const bootcamp = getBootcampBySlug(slug)
  
  if (!bootcamp) {
    notFound()
  }

  const sessions = getSessionsByBootcamp(slug)

  return <SessionsClient bootcamp={bootcamp} sessions={sessions} slug={slug} />
}
