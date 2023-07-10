'use client'

import Button from '@/components/Button'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import { Trip } from '@prisma/client'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { differenceInDays } from 'date-fns'
import { useRouter } from 'next/navigation'

interface TripReservationProps {
  trip: Trip
}

const tripReservationSchema = zod.object({
  guests: zod
    .string()
    .trim()
    .nonempty('Número de hóspedes é obrigatório')
    .regex(/^\d+$/, 'Apenas números são permitidos'),
  startDate: zod.nullable(
    zod.date({
      required_error: 'Data de início é obrigatória',
    }),
  ),
  endDate: zod.nullable(
    zod.date({
      required_error: 'Data final é obrigatória',
    }),
  ),
})

type TripFormData = zod.infer<typeof tripReservationSchema>

const TripReservation = ({ trip }: TripReservationProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset,
    setError,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripReservationSchema),
  })

  const { push } = useRouter()

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const TripSubmit = async (data: TripFormData) => {
    const response = await fetch('/api/trips/check', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId: trip.id,
        }),
      ),
    })

    const res = await response.json()

    console.log(res)

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      })

      return setError('endDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      })
    }

    if (res?.error?.code === 'INVALID_DATE') {
      return setError('startDate', {
        type: 'manual',
        message: 'Data antiga.',
      })
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      return setError('startDate', {
        type: 'manual',
        message: 'Data inválida.',
      })
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      return setError('endDate', {
        type: 'manual',
        message: 'Data inválida.',
      })
    }

    push(
      `/trips/${
        trip.id
      }/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
        data.guests
      }`,
    )

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(TripSubmit)}
      className="flex flex-col px-5 lg:min-w-[380px] lg:rounded-lg lg:border lg:border-grayLight lg:p-5 lg:shadow-md"
    >
      <p className="mb-4 hidden text-xl text-primaryDark lg:block">
        <span className="font-semibold">R${Number(trip.pricePerDay)}</span> por
        dia
      </p>

      <div className="flex gap-4">
        <Controller
          {...register('startDate', { required: true })}
          name="startDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              placeholderText="Data de Início"
              onChange={onChange}
              selected={value}
              className="w-full"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              minDate={trip.startDate}
              maxDate={trip.endDate}
            />
          )}
        />

        <Controller
          {...register('endDate', { required: true })}
          name="endDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              placeholderText="Data final"
              onChange={onChange}
              selected={value}
              className="w-full"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              maxDate={trip.endDate}
              minDate={startDate ?? trip.startDate}
            />
          )}
        />
      </div>

      <Input
        placeholder={`Número de hóspedes (max: ${trip.maxGuests})`}
        className="mt-4"
        {...register('guests', {
          max: {
            value: trip.maxGuests,
            message: `Número de hóspedes não pode ser maior que ${trip.maxGuests}`,
          },
        })}
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="mt-3 flex justify-between">
        <p className="text-sm font-medium text-primaryDark">Total: </p>

        <p className="text-sm font-medium text-primaryDark">
          {startDate && endDate
            ? `R$${
                differenceInDays(endDate, startDate) * Number(trip.pricePerDay)
              }` ?? 1
            : 'R$0'}
        </p>
      </div>

      <div className="w-full border-b border-b-grayLight pb-10 lg:border-none lg:pb-0">
        <Button type="submit" className="mt-3 w-full ">
          Reservar agora
        </Button>
      </div>
    </form>
  )
}

export default TripReservation
