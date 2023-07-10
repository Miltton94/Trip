import ReactCountryFlag from 'react-country-flag'
import Image from 'next/image'
import { Trip } from '@prisma/client'

interface TripHeaderProps {
  trip: Trip
}

const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full lg:hidden">
        <Image
          src={trip.coverImage}
          fill
          className="object-cover"
          alt={trip.name}
        />
      </div>

      <div className="hidden grid-cols-[2fr,1fr,1fr] grid-rows-2 gap-2 lg:order-2 lg:grid">
        <div className="relative row-span-2">
          <Image
            src={trip.coverImage}
            fill
            alt={trip.name}
            className="rounded-bl-lg rounded-tl-lg object-cover shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[0]}
            fill
            alt={trip.name}
            className="object-cover shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[1]}
            fill
            alt={trip.name}
            className="rounded-tr-lg object-cover shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[2]}
            fill
            alt={trip.name}
            className="object-cover shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            src={trip.coverImage}
            fill
            alt={trip.name}
            className="rounded-br-lg object-cover shadow-md"
          />
        </div>
      </div>

      {/* TÍTULO E INFORMAÇÕES */}
      <div className="flex flex-col p-5 lg:order-1 lg:mb-10 lg:p-0">
        <h1 className="text-xl font-semibold text-primaryDark lg:text-3xl">
          {trip.name}
        </h1>

        <div className="my-1 flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />

          <p className="text-xs text-grayPrimary underline lg:text-base">
            {trip.location}
          </p>
        </div>

        <p className="text-xs text-grayPrimary lg:hidden">
          <span className="font-medium text-primary">
            R${trip.pricePerDay.toString()}
          </span>{' '}
          por dia
        </p>
      </div>
    </div>
  )
}

export default TripHeader
