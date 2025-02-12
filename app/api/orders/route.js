import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prisma';

/**
 * Managing GET in creating new order..
 *
 * @param {Request} req - HTTP request object.
 * @returns {Response} - HTTP response.
 */
export async function GET(req) {
    const session = await getServerSession(authOptions);

    // Login Checker
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    try {
        if (type === "all") {
            const orders = await prisma.order.findMany({
                where: { userId: session.user.id },
                include: { items: true }
            });
            return new Response(JSON.stringify(orders), { status: 200 });
        } else {
            const latestOrder = await prisma.order.findFirst({
                where: { userId: session.user.id },
                orderBy: { createdAt: "desc" },
                include: { items: true }
            });

            if (!latestOrder) {
                return new Response(JSON.stringify({ error: "Brak zamówień" }), { status: 404 });
            }

            return new Response(JSON.stringify(latestOrder), { status: 200 });
        }
    } catch (error) {
        console.error("Błąd pobierania zamówienia:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}

/**
 * Managing post in creating new order.
 *
 * @param {Request} req - HTTP request object.
 * @returns {Response} - HTTP response.
 */
export async function POST(req) {
    const session = await getServerSession(authOptions);

    // Login Checker
    if (!session?.user?.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    const { items } = await req.json();

    // Validation
    if (!items?.length) {
        return new Response(JSON.stringify({ error: "Brak produktów w zamówieniu" }), { status: 400 });
    }

    try {
        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
                items: {
                    create: items.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: { items: true }
        });

        return new Response(JSON.stringify(order), { status: 201 });
    } catch (error) {
        console.error("Błąd podczas zapisu zamówienia:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}