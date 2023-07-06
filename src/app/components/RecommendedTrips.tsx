import TripItem from '@/components/TripItem'
import { Trip } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import React from 'react'

const RecommendedTrips = async () => {
  const data = await prisma.trip.findMany()

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="bg-grayLighter h-[1px] w-full"></div>
        <h2 className="whitespace-nowrap px-5 font-medium text-grayPrimary">
          Destinos Recomendados
        </h2>
        <div className="bg-grayLighter h-[1px] w-full"></div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedTrips
