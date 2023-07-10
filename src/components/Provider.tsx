'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <div className="flex h-screen flex-col">{children}</div>
      <ToastContainer />
    </SessionProvider>
  )
}
