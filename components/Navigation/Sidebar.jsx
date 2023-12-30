import React, { useEffect, useRef } from 'react'
import { menuItemsData } from './menuItemsData'
import MobileMenuItems from './MobileMenuItems'

const Sidebar = ({ isOpen, setIsOpen, toggle }) => {
  let ref = useRef()

  useEffect(() => {
    const handler = (event) => {
      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
        // toggle()
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [isOpen])
  return (
    <>
      <div
        className="mobile-nav" // sidebar-container ${isOpen ? 'top-0 opacity-100' : '-top-full opacity-0'} fixed left-0 z-10 grid h-full w-full justify-center overflow-hidden bg-white pt-[120px]"
        style={{
          opacity: `${isOpen ? '1' : '0'}`,
          top: ` ${isOpen ? '0' : '-100%'}`,
          color: 'black',
        }}>
        {isOpen && (
          <ul className="menus" ref={ref}>
            {menuItemsData.map((menu, index) => {
              return <MobileMenuItems items={menu} key={index} />
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default Sidebar
