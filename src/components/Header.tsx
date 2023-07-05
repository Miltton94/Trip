'use client'

import { Menu } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

const Header = () => {
  const { status, data } = useSession()
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <div className="container mx-auto flex justify-between p-5">
      <Image src="/logo.svg" width={183} height={32} alt="Full Stack" />

      {status === 'unauthenticated' ? (
        <button
          onClick={() => signIn()}
          className="text-sm font-semibold text-primary"
        >
          Login
        </button>
      ) : (
        <div className="border-grayLighter relative flex items-center gap-3 rounded-full border border-solid p-2 px-3">
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
            className="ml-2 rounded-full"
          />

          {menuIsOpen && (
            <div className="absolute left-0 top-14 flex h-full w-full flex-col items-center justify-center rounded-lg bg-white shadow-md">
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
