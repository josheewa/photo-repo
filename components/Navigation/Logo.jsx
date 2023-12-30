import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from './Button'

const Logo = () => {
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0)

  const updateWidth = () => {
    const newWidth = window.innerWidth
    setWidth(newWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    updateWidth()
  }, [])

  // change between the logo and the button when the user scrolls
  const [showButton, setShowButton] = useState(false)

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNavButton)
  }, [])

  return (
    <>
      <Link href="/" className="flex items-center ${showButton ? 'hidden' : ''}">
        <Image
          src="/logo.png"
          alt="Logo"
          width={35} height={35}
          className="relative px-2"
        />
        <h1 className="logo text-3xl font-bold text-white">PhotoRepo</h1>
      </Link>
      <div
        style={{
          display: showButton ? 'block' : 'none',
        }}>
        {/* <Button /> */}
      </div>
    </>
  )
}

export default Logo
