// types/next-auth.d.ts
import { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      imageUrl?: string
      role?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    imageUrl?: string
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId?: string
    imageUrl?: string
    role?: string
  }
}