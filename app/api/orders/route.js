import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prisma';

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    try {
        if (type === "all") {
            // Pobierz wszystkie zamówienia zalogowanego użytkownika
            const orders = await prisma.order.findMany({
                where: { userId: session.user.id },
                include: { items: true }
            });
            return new Response(JSON.stringify(orders), { status: 200 });
        } else if (type === "latest") {
            // Pobierz najnowsze zamówienie zalogowanego użytkownika
            const latestOrder = await prisma.order.findFirst({
                where: { userId: session.user.id },
                orderBy: { createdAt: "desc" },
                include: { items: true }
            });

            if (!latestOrder) {
                return new Response(JSON.stringify({ error: "Brak zamówień" }), { status: 404 });
            }

            return new Response(JSON.stringify(latestOrder), { status: 200 });
        } else if (type === "fall") {
            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { role: true }
            });

            if (user.role !== 'admin' && user.role !== 'employee') {
                return new Response(JSON.stringify({ error: "Nie masz uprawnień do przeglądania wszystkich zamówień" }), { status: 403 });
            }

            const allOrders = await prisma.order.findMany({
                include: { items: true }
            });

            return new Response(JSON.stringify(allOrders), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: "Nieprawidłowy typ zapytania" }), { status: 400 });
        }
    } catch (error) {
        console.error("Błąd pobierania zamówienia:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    const { items } = await req.json();

    if (!items || items.length === 0) {
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

// Aktualizacja statusu zamówienia
export async function PATCH(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
        return new Response(JSON.stringify({ error: "Brak ID zamówienia" }), { status: 400 });
    }

    const { status } = await req.json();

    if (!status) {
        return new Response(JSON.stringify({ error: "Brak nowego statusu" }), { status: 400 });
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status }
        });

        return new Response(JSON.stringify(updatedOrder), { status: 200 });
    } catch (error) {
        console.error("Błąd aktualizacji zamówienia:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}