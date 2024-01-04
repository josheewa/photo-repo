import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import MenuItems from './MenuItems'
import MobileMenuItems from './MobileMenuItems'
import { menuItemsData } from './menuItemsData'

const Navigation = () => {
  // Toggle mobile menu
  const [mobileIsOpen, setMobileMenu] = useState(false)
  const sideRef = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    let isMouseDownHandled = false
    let isHandlingClick = false

    const handleClick = (event) => {
      // Skip touchstart if mousedown has already been handled
      if (event.type === 'touchstart' && isMouseDownHandled) {
        return
      }

      // Closes menu when clicking outside menu and button
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target) &&
        sideRef.current &&
        !sideRef.current.contains(event.target)
      ) {
        if (!isHandlingClick) {
          setMobileMenu(false)
        }
      }
      // Toggles menu when menu is pressed
      else if (hamburgerRef.current && hamburgerRef.current.contains(event.target)) {
        if (!isHandlingClick) {
          setMobileMenu((prev) => !prev)
          if (event.type === 'mousedown') {
            isMouseDownHandled = true
          }
          isHandlingClick = true

          // Reset the flag after a short delay
          setTimeout(() => {
            isHandlingClick = false
          }, 100)
        }
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return (
    <>
      {/* Main navbar for desktop */}
      <div className="nav-container sticky top-0 z-10 h-20 w-full bg-gray-900 shadow-lg">
        <div className="nav container mx-auto flex h-full items-center justify-between px-4">
          <Logo className="fixed left-0" />
          <div className="item-container flex-grow">
            <ul className="menus hidden items-center justify-center gap-x-6 text-xl text-white md:flex">
              {menuItemsData.map((menu, index) => {
                return <MenuItems items={menu} key={index} />
              })}
            </ul>
          </div>

          <button type="button" className="inline-flex items-center md:hidden" ref={hamburgerRef}>
            <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 18L20 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12L20 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 6L20 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navbar */}
      <div className={`mobile-nav ${mobileIsOpen ? '' : 'hidden'} text-black`}>
        {mobileIsOpen && (
          <ul className="menus" ref={sideRef}>
            {menuItemsData.map((menu, index) => {
              return <MobileMenuItems items={menu} key={index} setMobileMenu={setMobileMenu} />
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default Navigation
