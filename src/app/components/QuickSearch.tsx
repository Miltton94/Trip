import Image from 'next/image'

const QuickSearch = () => {
  return (
    <div className="p-5 xl:container xl:mx-auto">
      <div className="flex items-center space-x-5">
        <span className="h-[1px] w-full bg-grayLight" />

        <h2 className="whitespace-nowrap font-medium text-grayPrimary">
          Tente pesquisar por
        </h2>

        <span className="h-[1px] w-full bg-grayLight" />
      </div>

      <div className="mt-5 flex w-full justify-between">
        <div className="flex flex-col items-center gap-1">
          <Image width={36} height={36} src="/hotel-icon.png" alt="Hotel" />

          <p className="text-sm text-grayPrimary">Hotel</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Image width={36} height={36} src="/farm-icon.png" alt="Hotel" />

          <p className="text-sm text-grayPrimary">Fazenda</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Image width={36} height={36} src="/cottage-icon.png" alt="Hotel" />

          <p className="text-sm text-grayPrimary">Chalé</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Image width={36} height={36} src="/inn-icon.png" alt="Hotel" />

          <p className="text-sm text-grayPrimary">Pousada</p>
        </div>
      </div>
    </div>
  )
}

export default QuickSearch
