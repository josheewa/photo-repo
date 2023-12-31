import Dropdown from './Dropdown'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false)
  let ref = useRef()

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    setDropdown(true)
  }

  const onMouseLeave = () => {
    setDropdown(false)
  }

  const toggleDropdown = () => {
    setDropdown((prev) => !prev)
  }

  const closeDropdown = () => {
    dropdown && setDropdown(false)
    console.log('close')
  }

  return (
    <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => toggleDropdown()}>
            <Link href={items.url}>{items.title}</Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
            setDropdown={setDropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? 'true' : 'false'}>
            {items.title}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
            setDropdown={setDropdown}
          />
        </>
      ) : (
        <button>
          <Link href={items.url}>{items.title}</Link>
        </button>
      )}
    </li>
  )
}

export default MenuItems
// import React, { useState, useEffect, useRef } from 'react'
// import Dropdown from './Dropdown'
// import Link from 'next/link'

// const MenuItems = ({ items, toggle }) => {
//   const [dropdown, setDropdown] = useState(false)
//   const buttonRef = useRef(null)
//   const closeOnClick = (event) => {
//     if (buttonRef.current && !buttonRef.current.contains(event.target)) {
//       setDropdown(false)
//     }
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       closeOnClick(event)
//     }

//     document.addEventListener('click', handleClickOutside) // Add event listener when component mounts

//     return () => {
//       document.removeEventListener('click', handleClickOutside) // Clean up the event listener when component unmounts
//     }
//   }, [closeOnClick])

//   return (
//     <li className="menu-items">
//       {items.submenu ? (
//         <>
//           <button
//             type="button"
//             aria-haspopup="menu"
//             aria-expanded={dropdown ? 'true' : 'false'}
//             onClick={() => setDropdown(!dropdown)} //(prev) => !prev)}
//             ref={buttonRef}>
//             {items.title}{' '}
//           </button>

//           {dropdown && (
//             <Dropdown submenus={items.submenu} dropdown={dropdown} setDropdown={setDropdown} />
//           )}
//         </>
//       ) : (
//         <button>
//           <Link href={items.url}>{items.title}</Link>
//         </button>
//       )}
//     </li>
//   )
// }

// export default MenuItems
