import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prisma';

// GET /api/orders/[orderId] – Pobierz konkretne zamówienie
export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    // Pobierz orderId z params
    const { orderId } = await params; // Await params here

    try {
        const order = await prisma.order.findUnique({
            where: { id: parseInt(orderId) },
            include: { items: true }
        });

        if (!order) {
            return new Response(JSON.stringify({ error: "Zamówienie nie znalezione" }), { status: 404 });
        }

        return new Response(JSON.stringify(order), { status: 200 });
    } catch (error) {
        console.error("Błąd pobierania zamówienia:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}

// PATCH /api/orders/[orderId] – Zaktualizuj status zamówienia
export async function PATCH(req, { params }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    // Pobierz orderId z params
    const { orderId } = await params; // Await params here

    // Parsuj body żądania
    const { status } = await req.json();

    if (!status) {
        return new Response(JSON.stringify({ error: "Brak nowego statusu" }), { status: 400 });
    }

    // Lista dozwolonych statusów
    const allowedStatuses = ["pending", "preparing", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
        return new Response(JSON.stringify({ error: "Nieprawidłowy status" }), { status: 400 });
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

// DELETE /api/orders/[orderId] – Usuń zamówienie
export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    // Pobierz orderId z params
    const { orderId } = await params; // Await params here

    try {
        await prisma.order.delete({
            where: { id: parseInt(orderId) }
        });

        return new Response(JSON.stringify({ message: "Zamówienie usunięte" }), { status: 200 });
    } catch (error) {
        console.error("Błąd usuwania zamówienia:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}