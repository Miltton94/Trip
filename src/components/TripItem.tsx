import { Trip } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'

interface TripItemProps {
  trip: Trip
}

const TripItem = ({ trip }: TripItemProps) => {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex min-w-[280px] flex-col">
        <div className="relative h-[280px] w-[280px]">
          <Image
            src={trip.coverImage}
            className="rounded-lg object-cover shadow-md"
            fill
            alt={trip.name}
          />
        </div>

        <h3 className="text-primaryDarker mt-2 text-sm font-medium">
          {trip.name}
        </h3>
        <div className="my-1 flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary">{trip.location}</p>
        </div>

        <p className="text-xs text-grayPrimary">
          <span className="font-medium text-primary">
            R${trip.pricePerDay.toString()}
          </span>{' '}
          por dia
        </p>
      </div>
    </Link>
  )
}

export default TripItem
