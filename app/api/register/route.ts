import bcrypt from 'bcrypt';

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    const {
      email,
      name,
      password,
    } = body;

    if (!email || !name || !password) {
      return new NextResponse('정보가 없습니다.', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[REGISTER_ERROR]: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
