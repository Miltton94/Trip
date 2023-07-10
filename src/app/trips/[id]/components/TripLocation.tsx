import Button from '@/components/Button'
import Image from 'next/image'

interface TripLocationProps {
  location: string
  locationDescription: string
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5 lg:mt-12 lg:p-0 lg:pb-20">
      <h2 className="mb-5 font-semibold text-primaryDark lg:text-xl">
        Localização
      </h2>

      <div className="relative h-[280px] w-full lg:hidden">
        <Image
          src="/map-mobile.png"
          alt={location}
          fill
          className="rounded-lg object-cover shadow-md"
        />
      </div>

      <div className="relative hidden h-[480px] w-full lg:block">
        <Image
          src="/map-desktop.png"
          alt={location}
          fill
          className="rounded-lg object-cover shadow-md"
        />
      </div>

      <h3 className="text-primaryDarker mt-3 text-sm font-semibold lg:mt-5 lg:text-base">
        {location}
      </h3>

      <p className="mt-2 text-xs leading-5 text-primaryDark lg:mt-4 lg:text-sm">
        {locationDescription}
      </p>

      <Button
        variant="outlined"
        className="mt-5 w-full transition-colors hover:border-white hover:bg-primary hover:text-white md:w-[500px] md:self-center"
      >
        Ver no Google Maps
      </Button>
    </div>
  )
}

export default TripLocation
