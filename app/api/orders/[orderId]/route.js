import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prisma';

// GET /api/orders/[orderId] – Pobierz konkretne zamówienie
export async function GET(req) {
    const session = await getServerSession(authOptions);

    // Sprawdź, czy użytkownik jest zalogowany
    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    try {
        // Sprawdź rolę użytkownika
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        });

        // Jeśli użytkownik nie jest ani adminem, ani pracownikiem, zwróć błąd
        if (user.role !== 'admin' && user.role !== 'employee') {
            return new Response(JSON.stringify({ error: "Nie masz uprawnień do przeglądania zamówień" }), { status: 403 });
        }

        // Pobierz wszystkie zamówienia (bez ograniczeń do użytkownika)
        const orders = await prisma.order.findMany({
            include: { items: true }
        });

        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error("Błąd pobierania zamówień:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}

// PATCH /api/orders/[orderId] – Zaktualizuj status zamówienia
export async function PATCH(req, { params }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    const { orderId } = await params;

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