'use client'

import { Menu } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const { status, data } = useSession()
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <div className="container mx-auto flex min-h-[6rem] items-center justify-between px-5">
      <Link href="/">
        <Image src="/logo.svg" width={183} height={32} alt="Full Stack" />
      </Link>

      {status === 'unauthenticated' ? (
        <button
          onClick={() => signIn()}
          className="text-sm font-semibold text-primary"
        >
          Login
        </button>
      ) : (
        <div className="relative flex items-center gap-3 rounded-full border border-solid border-grayLight px-3 py-2">
          <Menu
            size={16}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="cursor-pointer"
          />

          <Image
            height={24}
            width={24}
            alt="Usuário"
            src={data?.user?.image ? data.user.image : '/user.svg'}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="absolute left-0 top-11 z-10 flex h-24 w-full flex-col items-center justify-center rounded-lg bg-white shadow-md">
              <Link href="/my-trips">
                <button className="border-b border-solid border-grayLight pb-2 text-sm font-semibold text-primary">
                  Minhas Viagens
                </button>
              </Link>

              <button
                className="pt-2 text-sm font-semibold text-primary"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
