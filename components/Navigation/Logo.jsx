import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'

const Logo = () => {
  return (
    <>
      <Link href="/" className="${showButton ? 'hidden' : ''} flex items-center">
        <Image src="/logo.png" alt="Logo" width={35} height={35} className="relative px-2" />
        <h1 className="logo text-3xl font-bold text-white">PhotoRepo</h1>
      </Link>
      <div>{/* <Button /> */}</div>
    </>
  )
}

export default Logo
