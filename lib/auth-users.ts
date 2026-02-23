import bcrypt from "bcryptjs"

export interface AuthUser {
  id: string
  email: string
  name: string
  password: string // hashed
  role: "admin" | "user"
}

// Mock user store — replace with a real database later
const users: AuthUser[] = [
  {
    id: "admin-001",
    email: "admin@bigfive.ci",
    name: "Admin Big Five",
    password: "$2b$10$LTkduduOxJv5/2r3xPwEwegjjUYFGr5erI00RrXgW3R8.N0iRBNxi", // admin123
    role: "admin",
  },
  {
    id: "user-001",
    email: "aminata.diallo@example.com",
    name: "Aminata Diallo",
    password: "$2b$10$5DjnEeYkz/Dtkw9eyuKlleB4kl7PetqmpFhGgQ5wUlUcb8HsQ0Xly", // user123
    role: "user",
  },
]

export function findUserByEmail(email: string): AuthUser | undefined {
  return users.find((u) => u.email === email)
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

export async function createUser(email: string, name: string, password: string): Promise<AuthUser> {
  const hash = await bcrypt.hash(password, 10)
  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    email,
    name,
    password: hash,
    role: "user",
  }
  users.push(newUser)
  return newUser
}
