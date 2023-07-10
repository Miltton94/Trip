import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outlined' | 'danger'
}

function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        ' appearance-none rounded-lg p-2 text-sm font-medium shadow transition-all',
        props.className,
        variant === 'primary'
          ? 'bg-primary text-white hover:bg-primaryDark'
          : 'border-2 border-primary bg-transparent text-primary',
        variant === 'danger' &&
          'border border-red-500 bg-transparent text-red-500 hover:bg-red-600 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

export default Button
