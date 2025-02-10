import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user) return null
                const isValid = await bcrypt.compare(credentials.password, user.password)
                return isValid ? { id: user.id, email: user.email } : null
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // promisses see what it can do here: https://stackoverflow.com/questions/39458201/understanding-javascript-promise-object
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            return session
        },
    },
}
// https://next-auth.js.org/configuration/callbacks
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }