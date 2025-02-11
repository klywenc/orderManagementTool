import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

export async function GET(req, context) {
    const { params } = context;
    const { orderId } = await params;

    try {
        console.log(`Pobieranie zamówienia o ID: ${orderId}`);

        const order = await prisma.order.findUnique({
            where: { id: parseInt(orderId) },
            include: {
                items: true,
            },
        });

        if (!order) {
            console.error('Nie znaleziono zamówienia');
            return new NextResponse('Zamówienie nie zostało znalezione.', { status: 404 });
        }

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);
        const page = pdfDoc.addPage([600, 400]);

        // Load the Aleo-Regular font
        const fontPath = path.resolve('./public/fonts/Aleo-Regular.otf');
        const fontBytes = fs.readFileSync(fontPath);
        const font = await pdfDoc.embedFont(fontBytes);

        const fontSize = 12;

        page.drawText('E-Faktura', { x: 200, y: 380, font, size: 20, color: rgb(0, 0, 0) });
        page.drawText('Megumi Ramen', { x: 50, y: 350, font, size: fontSize });
        page.drawText('Adres: Ul. Główna 24, 82-410 Stary Targ', { x: 50, y: 335, font, size: fontSize });
        page.drawText('NIP: 123-456-78-90', { x: 50, y: 320, font, size: fontSize });

        page.drawText('Faktura typu proforma, bez danych nabywającego:', { x: 50, y: 300, font, size: fontSize });
        page.drawText('Szczegóły zamówienia:', { x: 50, y: 240, font, size: fontSize });

        let yPosition = 220;
        let total = 0;

        order.items.forEach(item => {
            page.drawText(`${item.name}`, { x: 50, y: yPosition, font, size: fontSize });
            page.drawText(`Ilość: ${item.quantity}`, { x: 250, y: yPosition, font, size: fontSize });
            page.drawText(`Cena: ${item.price.toFixed(2)} zł`, { x: 350, y: yPosition, font, size: fontSize });
            page.drawText(`Łącznie: ${(item.price * item.quantity).toFixed(2)} zł`, { x: 450, y: yPosition, font, size: fontSize });

            total += item.price * item.quantity;
            yPosition -= 20;
        });

        page.drawText(`Suma do zapłaty: ${total.toFixed(2)} zł`, {
            x: 50,
            y: yPosition - 30,
            font,
            size: fontSize + 2,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        console.log('Faktura została pomyślnie wygenerowana');

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