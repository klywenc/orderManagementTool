import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prisma';

// Obsługa różnych zapytań GET
export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    try {
        if (type === "all") {
            // Pobierz wszystkie zamówienia użytkownika
            const orders = await prisma.order.findMany({
                where: { userId: session.user.id },
                include: { items: true }
            });
            return new Response(JSON.stringify(orders), { status: 200 });
        } else {
            // Pobierz najnowsze zamówienie
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

// Tworzenie zamówienia
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