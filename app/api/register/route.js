import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(request) {
    const { email, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        })
        return Response.json({ id: user.id, email: user.email }, { status: 201 })
    } catch (error) {
        return Response.json({ error: 'User already exists' }, { status: 400 })
    }
}