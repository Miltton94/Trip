'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { format } from 'date-fns'
import ReactCountryFlag from 'react-country-flag'
import ptBR from 'date-fns/locale/pt-BR'
import { useSession } from 'next-auth/react'
import Button from '@/components/Button'

import { Trip } from '@prisma/client'
import { toast } from 'react-toastify'
import router from 'next/router'
import { loadStripe } from '@stripe/stripe-js'

const TripConfirmation = ({ params }: { params: { id: string } }) => {
  const [trip, setTrip] = useState<Trip | null>()
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const { push } = useRouter()

  const { status, data } = useSession()

  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.id,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
        }),
      })

      const res = await response.json()

      if (res?.error) {
        return push('/')
      }

      setTrip(res.trip)
      setTotalPrice(res.totalPrice)
    }

    if (status === 'unauthenticated') {
      push('/')
    }

    fetchTrip()
  }, [status, searchParams, params, router])

  if (!trip) return null

  const handleBuyClick = async () => {
    const res = await fetch('/api/payment', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          tripId: params.id,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
          guests: Number(searchParams.get('guests')),
          userId: (data?.user as any)?.id!,
          totalPrice,
          coverImage: trip.coverImage,
          name: trip.name,
          description: trip.description,
        }),
      ),
    })

    if (!res.ok) {
      return toast.error('Ocorreu um erro ao realizar a reserva!', {
        position: 'bottom-center',
      })
    }

    const { sessionId } = await res.json()
    // console.log(response)

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY! as string,
    )

    await stripe?.redirectToCheckout({ sessionId })

    // push('/my-trips')

    toast.success('Reserva realizada com sucesso!', {
      position: 'bottom-center',
    })
  }

  const startDate = new Date(searchParams.get('startDate') as string)
  const endDate = new Date(searchParams.get('endDate') as string)
  const guests = searchParams.get('guests')

  return (
    <div className="container mx-auto p-5 lg:max-w-[1024px]">
      <h1 className="text-xl font-semibold text-primaryDark">Sua viagem</h1>

      {/* CARD */}
      <div className="mt-5 flex flex-col rounded-lg border border-solid border-grayLight p-5 shadow-lg">
        <div className="border-grayLighter flex items-center gap-3 border-b border-solid pb-5">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              alt={trip.name}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-primaryDark">
              {trip.name}
            </h2>

            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />

              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-primaryDark">
          Informações sobre o preço
        </h3>

        <div className="mt-1 flex justify-between">
          <p className="text-primaryDarker">Total:</p>

          <p className="font-medium">R${totalPrice}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col text-primaryDark">
        <h3 className="font-semibold">Data</h3>

        <div className="mt-1 flex items-center gap-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {' - '}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="mt-5 font-semibold">Hóspedes</h3>

        <p>{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  )
}

export default TripConfirmation
