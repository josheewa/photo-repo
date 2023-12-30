import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MobileDropdown from './MobileDropdown'

const MobileMenuItems = ({ items, depthLevel, setIsOpen }) => {
  const [dropdown, setDropdown] = useState(false)

  const closeDropdown = () => {
    dropdown && setDropdown(false)
  }
  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setDropdown((prev) => !prev)
  }
  return (
    <li className="menu-items" onClick={closeDropdown}>
      {items.url && items.submenu ? (
        // dropdown item with link in menu
        <>
          <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? 'true' : 'false'}>
            <Link href={items.url} onClick={closeMenu}>
              {items.title}
            </Link>
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? <span className="arrow-close" /> : <span className="arrow" />}
            </div>
          </button>
          <MobileDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
            setIsOpen={setIsOpen}
          />
        </>
      ) : !items.url && items.submenu ? (
        // dropdown item in menu
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={(e) => toggleDropdown(e)}>
            {items.title}
            <div>{dropdown ? <span className="arrow-close" /> : <span className="arrow" />}</div>
          </button>
          <MobileDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
            setIsOpen={setIsOpen}
          />
        </>
      ) : (
        <Link href={items.url} onClick={closeMenu}>
          {items.title}
        </Link>
      )}
    </li>
  )
}

export default MobileMenuItems
