'use client'

import Button from '@/components/Button'
import CurrencyInput from '@/components/CurrencyInput'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

interface TripSearchForm {
  text: string
  startDate: Date | null
  budget: string
}

const TripSearch = () => {
  const { push } = useRouter()

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TripSearchForm>()

  const onSubmit = (data: TripSearchForm) => {
    push(
      `/trips/search?text=${
        data.text
      }&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`,
    )
  }

  return (
    <div className="container mx-auto bg-search-background bg-cover bg-center bg-no-repeat p-5 lg:py-28">
      <h1 className="text-center text-2xl font-semibold text-primaryDark lg:text-[2.5rem]">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="mt-5 flex flex-col gap-4 lg:mx-auto lg:mt-12 lg:max-w-[948px] lg:flex-row lg:rounded-lg lg:bg-primary lg:bg-opacity-20 lg:p-4">
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors.text}
          errorMessage={errors.text?.message}
          {...register('text', {
            required: {
              value: true,
              message: 'Texto é obrigatório.',
            },
          })}
        />

        <div className="flex gap-4 lg:w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText="Data Final"
                className="w-full"
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                allowDecimals={false}
                placeholder="Orçamento"
                onValueChange={field.onChange as any}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="w-full self-center lg:h-fit lg:w-1/2"
        >
          Buscar
        </Button>
      </div>
    </div>
  )
}

export default TripSearch
