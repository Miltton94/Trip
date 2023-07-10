import { Check } from 'lucide-react'

interface TripHighlightsProps {
  highlights: string[]
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col p-5 lg:mt-12 lg:p-0">
      <h2 className="mb-2 font-semibold text-primaryDark lg:text-xl">
        Destaques
      </h2>

      <div className="flex flex-wrap gap-y-3 lg:mt-5">
        {highlights.map((highlight, index) => (
          <div
            key={highlight}
            className="flex w-1/2 items-center gap-2 lg:gap-3"
          >
            <Check className="text-primary" size={12} />

            <p className="text-xs text-grayPrimary lg:text-base">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripHighlights
