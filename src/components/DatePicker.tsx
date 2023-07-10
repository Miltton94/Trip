import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import _DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'

registerLocale('pt-BR', ptBR)

interface DatePickerProps extends ReactDatePickerProps {
  error?: boolean
  errorMessage?: string
}

const DatePicker = forwardRef<ReactDatePickerProps, DatePickerProps>(
  ({ error, errorMessage, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col">
        <_DatePicker
          {...props}
          locale="pt-BR"
          wrapperClassName="w-full"
          className={twMerge(
            'text-primaryDarker rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary',
            error ? 'border-red-500' : '',
            props.className,
          )}
          enableTabLoop={false}
          dateFormat={'dd/MM/yyyy'}
        />

        {error && errorMessage && (
          <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
        )}
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
