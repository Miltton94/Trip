'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Prisma } from '@prisma/client'
import Link from 'next/link'

import UserReservationItem from './components/UserReservationItem'
import Button from '@/components/Button'

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true }
    }>[]
  >([])

  const { status, data } = useSession()

  const router = useRouter()

  const fetchReservations = async () => {
    const response = await fetch(
      `/api/user/${(data?.user as any)?.id}/reservations`,
    )

    const json = await response.json()

    setReservations(json)
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/')
    }

    fetchReservations()
  }, [status])

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-5">
      <h1 className="text-primaryDarker text-xl font-semibold lg:mb-5">
        Minhas Viagens
      </h1>

      {reservations.length > 0 ? (
        <div className="flex flex-col flex-wrap justify-center lg:flex-row lg:gap-14">
          {reservations?.map((reservation) => (
            <UserReservationItem
              fetchReservations={fetchReservations}
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col lg:max-w-[500px]">
          <p className="mt-2 font-medium text-primaryDark">
            Você ainda não tem nenhuma reserva! =(
          </p>

          <Link href="/">
            <Button className="mt-2 w-full lg:mt-5">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyTrips
