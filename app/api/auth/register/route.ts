import { NextResponse } from "next/server"
import { findUserByEmail, createUser } from "@/lib/auth-users"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    )
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 6 caractères." },
      { status: 400 }
    )
  }

  const existing = findUserByEmail(email)
  if (existing) {
    return NextResponse.json(
      { error: "Un compte avec cet email existe déjà." },
      { status: 409 }
    )
  }

  await createUser(email, name, password)

  return NextResponse.json({ success: true }, { status: 201 })
}
