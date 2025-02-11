import { PDFDocument, rgb } from 'pdf-lib';

export const generateInvoicePDF = async (order) => {
    const pdfDoc = await PDFDocument.create();

    // Tworzymy stronę
    const page = pdfDoc.addPage([600, 850]);

    // Ustalamy czcionkę
    const font = await pdfDoc.embedFont(PDFDocument.StandardFonts.Helvetica);

    // Ustalamy tło
    const { height } = page.getSize();
    const titleFontSize = 24;
    const textFontSize = 12;

    page.drawText('E-Faktura', {
        x: 50,
        y: height - 50,
        size: titleFontSize,
        font: font,
        color: rgb(0, 0, 0),
    });

    // Dodajemy dane zamówienia
    page.drawText(`Zamówienie #${order.id}`, {
        x: 50,
        y: height - 100,
        size: textFontSize,
        font: font,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Data zamówienia: ${new Date(order.createdAt).toLocaleDateString()}`, {
        x: 50,
        y: height - 120,
        size: textFontSize,
        font: font,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Status: ${order.status}`, {
        x: 50,
        y: height - 140,
        size: textFontSize,
        font: font,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Łączna kwota: ${order.total.toFixed(2)} zł`, {
        x: 50,
        y: height - 160,
        size: textFontSize,
        font: font,
        color: rgb(0, 0, 0),
    });

    // Nagłówek tabeli
    let currentY = height - 200;
    page.drawText('Nazwa produktu', { x: 50, y: currentY, size: textFontSize, font: font });
    page.drawText('Ilość', { x: 350, y: currentY, size: textFontSize, font: font });
    page.drawText('Cena', { x: 450, y: currentY, size: textFontSize, font: font });
    page.drawText('Łączna cena', { x: 550, y: currentY, size: textFontSize, font: font });

    // Wiersze tabeli
    currentY -= 20;
    order.items.forEach((item, index) => {
        page.drawText(item.name, { x: 50, y: currentY, size: textFontSize, font: font });
        page.drawText(`${item.quantity}`, { x: 350, y: currentY, size: textFontSize, font: font });
        page.drawText(`${item.price.toFixed(2)} zł`, { x: 450, y: currentY, size: textFontSize, font: font });
        page.drawText(`${(item.price * item.quantity).toFixed(2)} zł`, { x: 550, y: currentY, size: textFontSize, font: font });
        currentY -= 20;
    });

    // Zapisujemy PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};
