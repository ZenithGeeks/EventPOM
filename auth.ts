import NextAuth from "next-auth"
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import Google from "next-auth/providers/google"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import Nodemailer from "next-auth/providers/nodemailer"

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
 
export const { handlers, signIn, signOut, auth } = NextAuth({
 adapter: PostgresAdapter(pool),
  providers: [
    Google,
    Nodemailer({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
],
  secret: process.env.AUTH_SECRET,
  callbacks: {
     async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.userId = user.id;
        token.imageUrl = user.imageUrl;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.userId!;
        session.user.imageUrl = token.imageUrl;
        session.user.role = token.role;
      }
      return session;
    },
  },
})