import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        'hover:bg-primaryDarker appearance-none rounded-lg bg-primary p-2 text-sm font-medium text-white shadow transition-all',
        props.className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
