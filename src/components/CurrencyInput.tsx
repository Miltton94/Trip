import _CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'
import { twMerge } from 'tailwind-merge'

interface CurrencyProps extends CurrencyInputProps {
  error?: boolean
  errorMessage?: string
}

const CurrencyInput = ({ error, errorMessage, ...props }: CurrencyProps) => {
  return (
    <div className="flex w-full flex-col">
      <_CurrencyInput
        {...props}
        lang="pt-BR"
        className={twMerge(
          'text-primaryDarker w-full rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary',
          error ? 'border-red-500' : '',
          props.className,
        )}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
      />

      {error && errorMessage && (
        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      )}
    </div>
  )
}

export default CurrencyInput
