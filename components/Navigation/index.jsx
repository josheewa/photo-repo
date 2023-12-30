import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
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
        // setIsOpen(false)
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
    // document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchend', handleClick)
    }
  }, [])

  // const calculateMenuPosition = () => {
  //   if (buttonRef.current && sideRef.current) {
  //     const buttonRect = buttonRef.current.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;
  
  //     const leftPosition = buttonRect.left + buttonRect.width;
  //     const rightPosition = window.innerWidth - buttonRect.left;
  //     const topPosition = buttonRect.top + window.scrollY; // Adjust for scroll position
  
  //     // Calculate the bottom position if needed
  //     // const bottomPosition = windowHeight - buttonRect.bottom + window.scrollY;
  
  //     sideRef.current.style.left = `${leftPosition}px`;
  //     sideRef.current.style.right = `${rightPosition}px`;
  //     sideRef.current.style.top = `${topPosition}px`;
  //     // sideRef.current.style.bottom = `${bottomPosition}px`; // Uncomment if using bottom
  //   }
  // };

  // useEffect(() => {
  //   calculateMenuPosition()
  //   window.addEventListener('resize', calculateMenuPosition)

  //   return () => {
  //     window.removeEventListener('resize', calculateMenuPosition)
  //   }
  // }, [])

  return (
    <div className="nav-container">
      {/* Main navbar for desktop */}
      <div className="sticky top-0 z-10 h-20 w-full bg-gray-800">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center justify-between">
            <Logo />

            <ul className="nav menus hidden gap-x-6 text-xl text-white md:flex">
              {menuItemsData.map((menu, index) => {
                return <MenuItems items={menu} key={index} />
              })}
            </ul>
            {/* Placeholder div for layout of navbar items, to be modified */}
            <div></div>
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
      </div>

      {/* Sidebar/mobile navbar */}
      <div className="mobile-nav ${isOpen ? 'block' : 'hidden'} text-black">
        {isOpen && (
          <ul className="menus" ref={sideRef}>
            {menuItemsData.map((menu, index) => {
              return <MobileMenuItems items={menu} key={index} />
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Navigation
