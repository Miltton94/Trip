import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  console.log({ userId })

  if (!userId) {
    return {
      status: 400,
      body: {
        message: 'Missing userId',
      },
    }
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId,
    },
    include: {
      trip: true,
    },
  })

  console.log({ reservations })

  return new NextResponse(JSON.stringify(reservations), { status: 200 })
}
