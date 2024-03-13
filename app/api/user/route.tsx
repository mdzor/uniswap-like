import { NextRequest, NextResponse } from 'next/server'
import { NextApiRequest } from 'next/types';
import { getCsrfToken, useSession } from 'next-auth/react';
import prisma from '@/configs/db'


export async function POST(request: Request) {

  const { address, email } = await request.json();



  if (!email || !address) {
    return new NextResponse('Email or address is missing', {
      status: 400
    })
  }

  try {
    const user = await prisma.user.update({
      where: { email: email },
      data: { address: address },
    });



    return new NextResponse('User updated successfully', {
      status: 200
    })

  } catch (error) {
    console.error(error);
    return new NextResponse('Error updating user', {
      status: 500
    })

  }
}
