import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        console.log("Brak sesji użytkownika", session);
        return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), { status: 401 });
    }

    try {
        const latestOrder = await prisma.order.findFirst({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            include: { items: true }
        });

        console.log("Latest Order:", latestOrder);

        if (!latestOrder) {
            console.log("Brak zamówienia dla użytkownika", session.user.id);
            return new Response(JSON.stringify({ error: "Brak zamówień" }), { status: 404 });
        }

        return new Response(JSON.stringify(latestOrder), { status: 200 });
    } catch (error) {
        console.error("Błąd pobierania zamówienia:", error);
        return new Response(JSON.stringify({ error: "Błąd serwera" }), { status: 500 });
    }
}
