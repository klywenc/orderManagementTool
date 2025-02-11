import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import prisma from '@/lib/prisma'; // Importuj instancję Prisma do bazy danych

export async function GET(req, { params }) {
    const { orderId } = params; // Dostęp do dynamicznego parametru

    try {
        console.log(`Pobieranie zamówienia o ID: ${orderId}`);

        // Pobieramy zamówienie z bazy danych na podstawie ID
        const order = await prisma.order.findUnique({
            where: { id: parseInt(orderId) },
            include: {
                items: true, // Pobierz powiązane produkty w zamówieniu
            },
        });

        if (!order) {
            console.error('Nie znaleziono zamówienia');
            return new NextResponse('Zamówienie nie zostało znalezione.', { status: 404 });
        }

        // Tworzymy nowy dokument PDF
        const pdfDoc = await PDFDocument.create();

        // Dodajemy stronę do PDF
        const page = pdfDoc.addPage([600, 400]);

        // Ustawiamy czcionkę
        const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
        const fontSize = 12;

        // Dodajemy nagłówek (dane firmy)
        page.drawText('E-Faktura', {
            x: 200,
            y: 380,
            font: font,
            size: 20,
            color: rgb(0, 0, 0),
        });

        page.drawText('Firma XYZ', { x: 50, y: 350, font, size: fontSize });
        page.drawText('Adres: Ul. Przykładowa 1, 00-001 Miasto', { x: 50, y: 335, font, size: fontSize });
        page.drawText('NIP: 123-456-78-90', { x: 50, y: 320, font, size: fontSize });

        // Dodajemy dane odbiorcy
        page.drawText('Dane odbiorcy:', { x: 50, y: 300, font, size: fontSize });
        page.drawText(`Imię i nazwisko: ${order.user.name}`, { x: 50, y: 285, font, size: fontSize });
        page.drawText(`Adres: ${order.user.address}`, { x: 50, y: 270, font, size: fontSize });

        // Dodajemy szczegóły zamówienia
        page.drawText('Szczegóły zamówienia:', { x: 50, y: 240, font, size: fontSize });

        let yPosition = 220;
        let total = 0;

        // Rysujemy tabelę z produktami w zamówieniu
        order.items.forEach(item => {
            page.drawText(`${item.name}`, { x: 50, y: yPosition, font, size: fontSize });
            page.drawText(`Ilość: ${item.quantity}`, { x: 250, y: yPosition, font, size: fontSize });
            page.drawText(`Cena: ${item.price.toFixed(2)} zł`, { x: 350, y: yPosition, font, size: fontSize });
            page.drawText(`Łącznie: ${(item.price * item.quantity).toFixed(2)} zł`, { x: 450, y: yPosition, font, size: fontSize });

            total += item.price * item.quantity;
            yPosition -= 20;
        });

        // Podsumowanie zamówienia
        page.drawText(`Suma do zapłaty: ${total.toFixed(2)} zł`, {
            x: 50,
            y: yPosition - 30,
            font,
            size: fontSize + 2,
            color: rgb(0, 0, 0),
        });

        // Finalizujemy generowanie PDF
        const pdfBytes = await pdfDoc.save();
        console.log('Faktura została pomyślnie wygenerowana');

        // Zwracamy PDF jako odpowiedź
        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=faktura_${order.id}.pdf`,
            },
        });

    } catch (error) {
        console.error('Błąd podczas generowania faktury:', error);
        return new NextResponse('Błąd serwera podczas generowania faktury.', { status: 500 });
    }
}
