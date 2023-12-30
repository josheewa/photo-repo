import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import Button from './Button'
import MenuItems from './MenuItems'
import MobileMenuItems from './MobileMenuItems'
import { menuItemsData } from './menuItemsData'

const Navigation = () => {
  // Toggle sidebar
  const [isOpen, setIsOpen] = useState(false)
  const sideRef = useRef(null)
  const buttonRef = useRef(null)

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
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        sideRef.current &&
        !sideRef.current.contains(event.target)
      ) {
        if (!isHandlingClick) {
          setIsOpen(false)
        }
      }
      // Toggles menu when menu is pressed
      else if (buttonRef.current && buttonRef.current.contains(event.target)) {
        if (!isHandlingClick) {
          setIsOpen((prev) => !prev)
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

    // Handle both click and touch events
    document.addEventListener('mousedown', handleClick)

    // Attach touch events only on mobile devices
    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
      document.addEventListener('touchend', handleClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchend', handleClick)
    }
  }, [])

  return (
    <>
      {/* Main navbar for desktop */}
      <div className="nav-container sticky top-0 z-10 h-20 w-full bg-gray-900 shadow-lg">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center justify-between">
            <Logo />
            <div className="nav item-container">
              <ul className="menus hidden gap-x-6 text-xl text-white md:flex">
                {menuItemsData.map((menu, index) => {
                  return <MenuItems items={menu} key={index} />
                })}
              </ul>
            </div>

            {/* Placeholder for layout of navbar items, to be modified to potential contact dropdown*/}
            <div className="hidden md:block">{/* <Button /> */}</div>

            <button type="button" className="inline-flex items-center md:hidden" ref={buttonRef}>
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

        {/* Mobile navbar */}
        <div className="mobile-nav ${isOpen ? '' : 'hidden'} text-black">
          {isOpen && (
            <ul className="menus" ref={sideRef}>
              {menuItemsData.map((menu, index) => {
                return <MobileMenuItems items={menu} key={index} />
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default Navigation
