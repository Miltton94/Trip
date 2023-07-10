import Image from 'next/image'
import Link from 'next/link'

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="h-[1px] w-full bg-grayLight"></div>
        <h2 className="whitespace-nowrap px-5 font-medium text-grayPrimary">
          Tente pesquisar por
        </h2>
        <div className="h-[1px] w-full bg-grayLight"></div>
      </div>

      <div className="mt-5 flex w-full justify-between lg:mt-10 lg:justify-center lg:gap-40">
        <div className="flex flex-col items-center gap-1">
          <Link
            href={`/trips/search?text=hotel`}
            className="flex flex-col items-center transition-all hover:text-primary"
          >
            <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
            <p className="text-sm text-grayPrimary lg:text-base">Hotel</p>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link
            href="/trips/search?text=fazenda"
            className="flex flex-col items-center transition-all hover:text-primary"
          >
            <Image width={35} height={35} src="/farm-icon.png" alt="Fazenda" />
            <p className="text-sm text-grayPrimary lg:text-base">Fazenda</p>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link
            href="/trips/search?text=Chalé"
            className="flex flex-col items-center transition-all hover:text-primary"
          >
            <Image width={35} height={35} src="/cottage-icon.png" alt="Chalé" />
            <p className="text-sm text-grayPrimary lg:text-base">Chalé</p>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link
            href="/trips/search?text=pousada"
            className="flex flex-col items-center transition-all hover:text-primary"
          >
            <Image width={35} height={35} src="/inn-icon.png" alt="Pousada" />
            <p className="text-sm text-grayPrimary lg:text-base">Pousada</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickSearch
