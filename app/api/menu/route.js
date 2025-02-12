import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const menuItems = await prisma.menuItem.findMany();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Błąd podczas pobierania menu:", error);
    return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}