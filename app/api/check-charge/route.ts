/**
 * ====================================================================
 * API ROUTE : /api/check-charge
 * ====================================================================
 *
 * Vérifie le statut d'un charge Djamo.
 * Utilisé côté client (polling) pour confirmer un paiement.
 *
 * MÉTHODE : GET
 * QUERY PARAMS :
 *   - chargeId (string) : ID du charge Djamo à vérifier
 *
 * RÉPONSE (200) :
 *   - chargeId : ID du charge
 *   - status   : "due" | "paid" | "dropped" | "refunded" | "refunded_partially"
 *   - amount   : Montant en FCFA
 *   - paidAt   : Date de paiement (si payé)
 *
 * @see https://docs.djamo.com/api/collection.html#retrieve-a-charge
 * ====================================================================
 */

import { NextRequest, NextResponse } from "next/server"
import { getCharge, isDjamoApiConfigured } from "@/lib/djamo"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const chargeId = searchParams.get("chargeId")

    if (!chargeId) {
      return NextResponse.json(
        { error: "Le paramètre chargeId est requis." },
        { status: 400 }
      )
    }

    if (!isDjamoApiConfigured()) {
      return NextResponse.json(
        {
          error: "API Djamo non configurée.",
          // En mode fallback, on ne peut pas vérifier le statut
          status: "unknown",
        },
        { status: 503 }
      )
    }

    const charge = await getCharge(chargeId)

    return NextResponse.json({
      chargeId: charge.id,
      status: charge.status,
      amount: charge.amount,
      externalId: charge.externalId,
      createdAt: charge.createdAt,
      updatedAt: charge.updatedAt,
    })
  } catch (error) {
    console.error("[Djamo] Erreur lors de la vérification du charge:", error)
    return NextResponse.json(
      {
        error: "Impossible de vérifier le statut du paiement.",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    )
  }
}
