import React, { useEffect } from 'react'
import Logo from './Logo'
import MenuItems from './MenuItems'
import { menuItemsData } from './menuItemsData'

const Navbar = ({ toggle }) => {
  useEffect(() => {
    const handleToggle = () => {
      toggle()
    }

    document.addEventListener('mousedown', handleToggle)

    return () => {
      document.removeEventListener('mousedown', handleToggle)
    }
  }, [])
  return (
    <>
      <div className="sticky top-0 z-10 h-20 w-full bg-gray-800">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center justify-between">
            <Logo />

            <ul className="nav menus hidden gap-x-6 text-xl text-white md:flex">
              {menuItemsData.map((menu, index) => {
                return <MenuItems items={menu} key={index} />
              })}
            </ul>
            <div></div>
            <button type="button" className="inline-flex items-center md:hidden">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L20 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12L20 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 6L20 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
