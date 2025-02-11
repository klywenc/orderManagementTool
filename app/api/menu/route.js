// app/api/menu/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; // Import NextResponse

const prisma = new PrismaClient();

export async function GET(request) { // Użyj nazwanego eksportu GET
  try {
    const menuItems = await prisma.menuItem.findMany();
    return NextResponse.json(menuItems); // Użyj NextResponse.json
  } catch (error) {
    console.error("Błąd podczas pobierania menu:", error);
    return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 }); // Użyj NextResponse.json
  } finally {
    await prisma.$disconnect();
  }
}