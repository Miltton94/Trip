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
    <div className="flex h-24 items-center justify-between px-5 xl:container xl:mx-auto">
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
            <div className="absolute left-0 top-11 flex h-full w-full flex-col items-center justify-center rounded-lg bg-white shadow-md">
              <button
                className="text-sm font-semibold text-primary"
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
