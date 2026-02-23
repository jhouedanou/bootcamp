/**
 * ====================================================================
 * API ROUTE : /api/create-charge
 * ====================================================================
 *
 * Crée un "charge" (demande de paiement) Djamo via la Collection API.
 *
 * MÉTHODE : POST
 * BODY JSON :
 *   - bootcampSlug  (string)  : slug du bootcamp
 *   - sessionId     (string)  : identifiant de la session
 *   - participant   (object)  : infos du participant
 *     - civility, firstName, lastName, email, phone, company, position
 *   - newsletter    (boolean) : opt-in newsletter
 *
 * RÉPONSE (200) :
 *   - chargeId    : ID du charge Djamo
 *   - paymentUrl  : URL de paiement à rediriger le client
 *   - externalId  : Référence interne Big Five
 *
 * FALLBACK :
 *   Si l'API Djamo n'est pas configurée (variables d'env manquantes),
 *   retourne le lien de paiement statique.
 *
 * @see https://docs.djamo.com/api/collection.html#create-a-charge
 * ====================================================================
 */

import { NextRequest, NextResponse } from "next/server"
import {
  createCharge,
  generateExternalId,
  isDjamoApiConfigured,
  BASE_URL,
  DJAMO_STATIC_PAYMENT_URL,
} from "@/lib/djamo"
import { getBootcampBySlug, getSessionById } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bootcampSlug, sessionId, participant, newsletter } = body

    // ---------------------------------------------------------------
    // Validation des données entrantes
    // ---------------------------------------------------------------
    if (!bootcampSlug || !sessionId || !participant) {
      return NextResponse.json(
        { error: "Données manquantes : bootcampSlug, sessionId et participant sont requis." },
        { status: 400 }
      )
    }

    if (!participant.firstName || !participant.lastName || !participant.email || !participant.phone) {
      return NextResponse.json(
        { error: "Informations participant incomplètes (nom, prénom, email et téléphone requis)." },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------------
    // Récupération des données du bootcamp et de la session
    // ---------------------------------------------------------------
    const bootcamp = getBootcampBySlug(bootcampSlug)
    const session = getSessionById(sessionId)

    if (!bootcamp || !session) {
      return NextResponse.json(
        { error: "Bootcamp ou session introuvable." },
        { status: 404 }
      )
    }

    // ---------------------------------------------------------------
    // Mode fallback : lien statique si API Djamo non configurée
    // ---------------------------------------------------------------
    if (!isDjamoApiConfigured()) {
      console.warn(
        "[Djamo] API non configurée — utilisation du lien de paiement statique. " +
        "Configurez DJAMO_API_KEY et DJAMO_COMPANY_ID pour utiliser la Collection API."
      )
      return NextResponse.json({
        mode: "static",
        paymentUrl: DJAMO_STATIC_PAYMENT_URL,
        chargeId: null,
        externalId: null,
        message: "Mode lien statique — API Djamo non configurée.",
      })
    }

    // ---------------------------------------------------------------
    // Création du charge via l'API Djamo
    // ---------------------------------------------------------------
    const externalId = generateExternalId()

    /**
     * Construction des URLs de redirection :
     * - onCompletedRedirectionUrl : page de confirmation avec les params
     * - onCanceledRedirectionUrl  : retour au checkout avec un message
     *
     * On passe chargeId et externalId dans l'URL pour pouvoir
     * vérifier le statut côté client via /api/check-charge.
     */
    const completedUrl = new URL("/confirmation", BASE_URL)
    completedUrl.searchParams.set("bootcamp", bootcampSlug)
    completedUrl.searchParams.set("session", sessionId)
    // Le chargeId sera ajouté après la création — on utilise un placeholder
    // que l'on mettra à jour si nécessaire (Djamo gère la redirection)
    completedUrl.searchParams.set("ref", externalId)
    completedUrl.searchParams.set("status", "completed")

    const canceledUrl = new URL("/checkout", BASE_URL)
    canceledUrl.searchParams.set("bootcamp", bootcampSlug)
    canceledUrl.searchParams.set("session", sessionId)
    canceledUrl.searchParams.set("canceled", "true")

    const charge = await createCharge({
      amount: bootcamp.price,
      externalId,
      description: `Bootcamp "${bootcamp.title}" — Session ${session.city} (${session.dateStart} - ${session.dateEnd})`,
      onCompletedRedirectionUrl: completedUrl.toString(),
      onCanceledRedirectionUrl: canceledUrl.toString(),
      metadata: {
        bootcampSlug,
        sessionId,
        participantName: `${participant.firstName} ${participant.lastName}`,
        participantEmail: participant.email,
        participantPhone: participant.phone,
        participantCompany: participant.company || "",
        newsletter: String(!!newsletter),
      },
    })

    console.log(
      `[Djamo] Charge créé : ${charge.id} | External: ${externalId} | Amount: ${bootcamp.price} FCFA | Participant: ${participant.email}`
    )

    // ---------------------------------------------------------------
    // Réponse au client
    // ---------------------------------------------------------------
    return NextResponse.json({
      mode: "api",
      chargeId: charge.id,
      externalId,
      paymentUrl: charge.paymentUrl,
      amount: charge.amount,
      status: charge.status,
    })
  } catch (error) {
    console.error("[Djamo] Erreur lors de la création du charge:", error)

    // En cas d'erreur API, on propose le fallback statique
    return NextResponse.json(
      {
        error: "Erreur lors de la création du paiement.",
        fallbackUrl: DJAMO_STATIC_PAYMENT_URL,
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    )
  }
}
