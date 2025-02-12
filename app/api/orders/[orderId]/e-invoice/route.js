import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

/**
 * Handles GET requests to generate a proforma invoice PDF for a specific order.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Object} context - Contains route parameters, including the order ID.
 * @returns {NextResponse} - Returns a PDF file as a downloadable response or an error message.
 */
export async function GET(req, context) {
    const { params } = context;
    const { orderId } = params;

    try {
        console.log(`Fetching order with ID: ${orderId}`);

        // Retrieve the order from the database, including associated items
        const order = await prisma.order.findUnique({
            where: { id: parseInt(orderId) },
            include: { items: true },
        });

        // If the order is not found, return a 404 error
        if (!order) {
            console.error('Order not found');
            return new NextResponse('Zamówienie nie zostało znalezione.', { status: 404 });
        }

        // generating document
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit); // Register fontkit for custom font support
        const page = pdfDoc.addPage([600, 400]); // Set page dimensions

        // Static custom font path
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

        let yPosition = 220; // Vertical position for the first item
        let total = 0; // Initialize total order amount

        // Iterate through order items and add them to the PDF
        order.items.forEach(item => {
            page.drawText(`${item.name}`, { x: 50, y: yPosition, font, size: fontSize });
            page.drawText(`Ilość: ${item.quantity}`, { x: 250, y: yPosition, font, size: fontSize });
            page.drawText(`Cena: ${item.price.toFixed(2)} zł`, { x: 350, y: yPosition, font, size: fontSize });
            page.drawText(`Łącznie: ${(item.price * item.quantity).toFixed(2)} zł`, { x: 450, y: yPosition, font, size: fontSize });

            total += item.price * item.quantity; // calculatoing total amount
            yPosition -= 20; // Move down for the next item
        });

        // Add the total amount to the PDF
        page.drawText(`Suma do zapłaty: ${total.toFixed(2)} zł`, {
            x: 50,
            y: yPosition - 30,
            font,
            size: fontSize + 2,
            color: rgb(0, 0, 0),
        });

        // Save the PDF document to a byte array
        const pdfBytes = await pdfDoc.save();
        console.log('Faktura została pomyślnie wygenerowana');

        // Return the PDF as a downloadable file
        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=faktura_${order.id}.pdf`,
            },
        });

    } catch (error) {
        // Log and handle any errors that occur during PDF generation
        console.error('Error generating invoice:', error);
        return new NextResponse('Błąd serwera podczas generowania faktury.', { status: 500 });
    }
}