import Link from "next/link"
const Dropdown = ({ submenus, dropdown, setDropdown }) => {
  return (
    <ul className={`dropdown ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <Link href={submenu.url} onClick={() => setDropdown((prev) => !prev)}>{submenu.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
