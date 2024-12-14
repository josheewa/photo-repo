import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <>
      <Link href="/" className="flex items-center">
        <div className="relative overflow-hidden rounded-full bg-white">
          <Image src="/logo.png" width={45} height={45} />
        </div>

        <h1 className="logo text-3xl font-bold text-white">Josh's PhotoRepo</h1>
      </Link>
    </>
  )
}

export default Logo