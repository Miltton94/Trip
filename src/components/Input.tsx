import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, errorMessage, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col">
        <input
          ref={ref}
          {...props}
          className={twMerge(
            'text-primaryDarker w-full rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal placeholder-black placeholder-opacity-20 outline-none transition-all',
            error ? 'border-red-500' : 'focus:ring-1 focus:ring-primary',
            props.className,
          )}
        />

        {error && errorMessage && (
          <span className="mt-1 text-xs text-red-400">{errorMessage}</span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
