'use client'

import TripItem from '@/components/TripItem'
import { Trip } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([])

  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${
          searchParams.get('text') ?? ''
        }&startDate=${searchParams.get('startDate')}&budget=${searchParams.get(
          'budget',
        )}`,
      )

      console.log({ response })

      const data = await response.json()

      setTrips(data)
    }

    fetchTrips()
  }, [])

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center p-5 lg:pt-10">
      <h1 className="text-xl font-semibold text-primaryDark lg:text-[2.5rem]">
        Viagens Encontradas
      </h1>
      <h2 className="mb-5 font-medium text-grayPrimary lg:mt-6">
        {trips.length > 0
          ? 'Listamos as melhores viagens pra você!'
          : 'Não encontramos nada nos seus parâmetros! =('}
      </h2>

      <div className="flex flex-col flex-wrap justify-center md:flex-row md:gap-10 lg:pb-16">
        {trips?.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}

export default Trips
