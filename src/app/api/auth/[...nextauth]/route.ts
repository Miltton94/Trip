import NextAuth from 'next-auth'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw new Error('Failed to initialize Google authentication')

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }: any) {
      session.user = { ...session.user, id: user.id } as {
        id: string
        name: string
        email: string
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
