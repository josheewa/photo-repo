import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Navigation = () => {
  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
    </>
  )
}

export default Navigation
