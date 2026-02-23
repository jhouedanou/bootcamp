/**
 * ====================================================================
 * CLIENT DJAMO - COLLECTION API (CHARGE API)
 * ====================================================================
 *
 * Documentation officielle : https://docs.djamo.com/api/collection.html
 *
 * Ce module fournit un client TypeScript pour interagir avec l'API
 * Djamo Business. Il est utilisé côté serveur uniquement (API routes).
 *
 * CONFIGURATION REQUISE (variables d'environnement) :
 * - DJAMO_API_KEY        : Clé API fournie par Djamo
 * - DJAMO_COMPANY_ID     : Identifiant de votre entreprise Djamo
 * - DJAMO_BASE_URL       : URL de base de l'API (prod ou staging)
 * - DJAMO_WEBHOOK_SECRET  : Secret pour valider les webhooks (optionnel)
 * - NEXT_PUBLIC_BASE_URL  : URL publique de votre site (pour les redirections)
 *
 * FLUX DE PAIEMENT :
 * 1. Le client appelle /api/create-charge avec les détails de la commande
 * 2. Le serveur crée un "charge" via POST /v1/charges
 * 3. Djamo retourne un paymentUrl → le client y est redirigé
 * 4. Le client paie sur la page Djamo (QR code, mobile money, etc.)
 * 5. Djamo redirige vers onCompletedRedirectionUrl ou onCanceledRedirectionUrl
 * 6. Djamo envoie un webhook sur charge/events (paid / dropped)
 *
 * STATUTS D'UN CHARGE :
 * - "due"                 : Créé, en attente de paiement (TTL: 1h)
 * - "paid"                : Payé avec succès
 * - "dropped"             : Abandonné ou TTL expiré
 * - "refunded"            : Remboursé intégralement
 * - "refunded_partially"  : Remboursé partiellement
 * ====================================================================
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Statut possible d'un charge Djamo */
export type ChargeStatus =
  | "due"
  | "paid"
  | "dropped"
  | "refunded"
  | "refunded_partially"

/** Payload pour créer un nouveau charge */
export interface CreateChargePayload {
  /** Montant à collecter en FCFA (entier positif, pas de décimales) */
  amount: number
  /** Référence interne unique de la transaction côté Big Five */
  externalId: string
  /** Description visible par le client (ex: "Bootcamp Social Media - Session Mars 2026") */
  description: string
  /** URL de redirection après paiement réussi */
  onCompletedRedirectionUrl: string
  /** URL de redirection après annulation */
  onCanceledRedirectionUrl: string
  /** Métadonnées libres (infos participant, session, etc.) */
  metadata?: Record<string, string>
}

/** Réponse de l'API Djamo après création d'un charge */
export interface DjamoChargeResponse {
  id: string
  amount: number
  currency: string
  status: ChargeStatus
  externalId: string
  description: string
  paymentUrl: string
  metadata?: Record<string, string>
  createdAt: string
  updatedAt: string
}

/** Payload d'un événement webhook Djamo (charge/events) */
export interface DjamoWebhookEvent {
  id: string
  type: "charge.paid" | "charge.dropped" | "charge.refunded"
  data: {
    id: string
    amount: number
    currency: string
    status: ChargeStatus
    externalId: string
    description: string
    metadata?: Record<string, string>
    paidAt?: string
    createdAt: string
    updatedAt: string
  }
}

/** Données de commande sauvegardées localement */
export interface OrderData {
  participant: {
    civility: string
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    position: string
  }
  bootcamp: {
    slug: string
    title: string
    price: number
    duration: string
    format: string
  }
  session: {
    id: string
    dateStart: string
    dateEnd: string
    city: string
    trainer: string
    format: string
  }
  orderedAt: string
  newsletter: boolean
  chargeId?: string
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * URL de base de l'API Djamo.
 * - Production : https://api.djamo.com
 * - Staging    : https://api.staging.djamo.com
 */
const DJAMO_BASE_URL =
  process.env.DJAMO_BASE_URL || "https://api.djamo.com"

/** Clé API Djamo (header Authorization: Bearer) */
const DJAMO_API_KEY = process.env.DJAMO_API_KEY || ""

/** Identifiant de l'entreprise (header X-Company-Id) */
const DJAMO_COMPANY_ID = process.env.DJAMO_COMPANY_ID || ""

/** URL publique du site (pour construire les URLs de redirection) */
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

/** Lien de paiement statique Djamo (fallback si l'API n'est pas configurée) */
export const DJAMO_STATIC_PAYMENT_URL = "https://pay.djamo.com/2bqug"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Vérifie si l'API Djamo est correctement configurée.
 * Si les variables d'environnement ne sont pas renseignées,
 * on bascule sur le lien de paiement statique.
 */
export function isDjamoApiConfigured(): boolean {
  return !!(DJAMO_API_KEY && DJAMO_COMPANY_ID)
}

/**
 * Génère un identifiant externe unique pour une transaction.
 * Format : BF-{timestamp}-{random}
 */
export function generateExternalId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BF-${timestamp}-${random}`
}

// ---------------------------------------------------------------------------
// Client API
// ---------------------------------------------------------------------------

/**
 * Crée un nouveau charge (demande de paiement) via l'API Djamo.
 *
 * @see https://docs.djamo.com/api/collection.html#create-a-charge
 *
 * @param payload - Détails du paiement à créer
 * @returns La réponse Djamo contenant le paymentUrl
 * @throws Error si l'API retourne une erreur
 */
export async function createCharge(
  payload: CreateChargePayload
): Promise<DjamoChargeResponse> {
  if (!isDjamoApiConfigured()) {
    throw new Error(
      "Djamo API non configurée. Vérifiez DJAMO_API_KEY et DJAMO_COMPANY_ID."
    )
  }

  const response = await fetch(`${DJAMO_BASE_URL}/v1/charges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DJAMO_API_KEY}`,
      "X-Company-Id": DJAMO_COMPANY_ID,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      `Djamo API error (${response.status}): ${errorBody}`
    )
  }

  return response.json()
}

/**
 * Récupère le statut d'un charge existant.
 *
 * @see https://docs.djamo.com/api/collection.html#retrieve-a-charge
 *
 * @param chargeId - L'identifiant du charge Djamo
 * @returns Les détails du charge incluant son statut
 */
export async function getCharge(
  chargeId: string
): Promise<DjamoChargeResponse> {
  if (!isDjamoApiConfigured()) {
    throw new Error(
      "Djamo API non configurée. Vérifiez DJAMO_API_KEY et DJAMO_COMPANY_ID."
    )
  }

  const response = await fetch(`${DJAMO_BASE_URL}/v1/charges/${chargeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DJAMO_API_KEY}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      `Djamo API error (${response.status}): ${errorBody}`
    )
  }

  return response.json()
}

/**
 * Rembourse un charge (total ou partiel).
 *
 * @see https://docs.djamo.com/api/collection.html#refund-a-charge
 *
 * @param chargeId - L'identifiant du charge à rembourser
 * @param amount   - Montant partiel à rembourser (omis = remboursement total)
 */
export async function refundCharge(
  chargeId: string,
  amount?: number
): Promise<DjamoChargeResponse> {
  if (!isDjamoApiConfigured()) {
    throw new Error(
      "Djamo API non configurée. Vérifiez DJAMO_API_KEY et DJAMO_COMPANY_ID."
    )
  }

  const body: Record<string, unknown> = {}
  if (amount !== undefined) {
    body.amount = amount
  }

  const response = await fetch(
    `${DJAMO_BASE_URL}/v1/charges/${chargeId}/refund`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DJAMO_API_KEY}`,
      },
      body: JSON.stringify(body),
    }
  )

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      `Djamo API error (${response.status}): ${errorBody}`
    )
  }

  return response.json()
}
