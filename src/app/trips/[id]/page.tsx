import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import TripHeader from './components/TripHeader'
import TripReservation from './components/TripReservation'
import TripDescription from './components/TripDescription'
import TripHighlights from './components/TripHighlights'
import TripLocation from './components/TripLocation'

type TripsDetailsProps = {
  params: {
    id: string
  }
}

const TripsDetails = async ({ params: { id } }: TripsDetailsProps) => {
  if (!id) {
    redirect('/')
  }

  const trip = await prisma.trip.findUnique({
    where: {
      id,
    },
  })

  if (!trip) {
    redirect('/')
  }

  return (
    <div className="container mx-auto lg:px-16 lg:pt-10">
      <TripHeader trip={trip} />

      <div className="flex flex-col lg:mt-12 lg:flex-row lg:gap-20">
        <div className="lg:order-2">
          <TripReservation trip={trip} />
        </div>

        <div className="lg:order-1">
          <TripDescription description={trip.description} />

          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>

      <TripLocation
        locationDescription={trip.locationDescription}
        location={trip.location}
      />
    </div>
  )
}

export default TripsDetails
