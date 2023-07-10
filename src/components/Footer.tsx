import Image from 'next/image'

const Footer = () => {
  return (
    <div className="bg-walterWhite flex flex-col items-center justify-center p-5">
      <Image src="/logo.svg" width={133} height={23} alt="Full Stack Week" />
      <p className="text-primaryDarker mt-1 text-sm font-medium">
        Todos os direitos reservados.
      </p>
    </div>
  )
}

export default Footer
