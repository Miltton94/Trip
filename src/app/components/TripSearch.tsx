'use client'

import Button from '@/components/Button'
import CurrencyInput from '@/components/CurrencyInput'
import DatePicker from '@/components/DatePicker'
import Input from '@/components/Input'

const TripSearch = () => {
  return (
    <div className="bg-search-background bg-cover bg-center bg-no-repeat p-5 xl:container xl:mx-auto">
      <h1 className="text-center text-xl font-semibold text-primaryDark">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="mt-5 flex flex-col gap-4 md:flex-row">
        <Input placeholder="onde você quer ir?" />

        <div className="flex gap-4">
          <DatePicker onChange={() => {}} placeholderText="Data de ida" />
          <CurrencyInput placeholder="Orçamento" />
        </div>

        <Button>Pesquisar</Button>
      </div>
    </div>
  )
}

export default TripSearch
