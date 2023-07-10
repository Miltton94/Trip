import { ReactNode } from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import Provider from '@/components/Provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Trip',
  description: 'Sistema de reservas de viagens',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <Provider>
          <Header />

          <div className="flex-1">{children}</div>

          <Footer />
        </Provider>
      </body>
    </html>
  )
}
