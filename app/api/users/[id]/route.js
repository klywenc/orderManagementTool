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

export async function DELETE(request, { params }) {
  const authorization = await authorizeRequest();
  if (authorization.error) {
    return NextResponse.json(
      { message: authorization.error },
      { status: authorization.status }
    );
  }

  try {
    const userId = Number((await params).id);

    await prisma.$transaction([
      prisma.orderItem.deleteMany({
        where: { order: { userId } }
      }),
      prisma.order.deleteMany({
        where: { userId }
      }),
      prisma.user.delete({
        where: { id: userId }
      })
    ]);

    return NextResponse.json(
      { message: 'Użytkownik został usunięty' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: 'Błąd serwera podczas usuwania użytkownika' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request, { params }) {
  const authorization = await authorizeRequest();
  if (authorization.error) {
    return NextResponse.json(
      { message: authorization.error },
      { status: authorization.status }
    );
  }

  try {
    const userId = Number((await params).id);
    const { role } = await request.json();

    if (!role) {
      return NextResponse.json(
        { message: 'Wymagane jest podanie roli' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    
    return NextResponse.json({
      user: updatedUser,
      message: 'Rola użytkownika została zaktualizowana pomyślnie'
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: 'Błąd serwera podczas aktualizacji roli' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}