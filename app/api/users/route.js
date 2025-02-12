import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

const authorizeRequest = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { error: 'Nieautoryzowany dostęp', status: 401 };
  }

  if (session.user.role !== 'admin') {
    return { error: 'Brak uprawnień administratora', status: 403 };
  }

  return { session };
};

export async function GET() {
  const authorization = await authorizeRequest();
  if (authorization.error) {
    return NextResponse.json(
      { message: authorization.error },
      { status: authorization.status }
    );
  }

  try {
    const users = await prisma.user.findMany({
      select: { 
        id: true,
        email: true,
        role: true,
        createdAt: true
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: 'Błąd serwera' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}