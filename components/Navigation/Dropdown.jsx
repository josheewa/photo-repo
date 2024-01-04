import Link from 'next/link'
import Image from 'next/image'

const Dropdown = ({ submenus, dropdown, setDropdown }) => {
  return (
    <ul className={`dropdown ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <Link href={submenu.url} target={submenu.target} onClick={() => setDropdown(!dropdown)}>
            {/* Displays icon if there is one */}
            <span className="flex items-center flex-row">
                {submenu.icon && (
                  <Image
                    src={submenu.icon}
                    alt={submenu.title}
                    height={20}
                    width={20}
                    className="mr-3"
                  />
                )}
              <span>{submenu.title}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
