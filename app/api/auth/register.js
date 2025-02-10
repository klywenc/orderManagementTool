import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end()

    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        })
        res.status(201).json({ id: user.id, email: user.email })
    } catch (error) {
        res.status(400).json({ error: "User already exists" })
    }
}