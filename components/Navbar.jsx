import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (

      <div className="sticky top-0 h-20 w-full">
        <div  className="container mx-auto h-full px-4">
          <div style={{ justifyContent: 'center' }} className="flex h-full items-center justify-between">
            <ul className="hidden gap-x-6 text-white md:flex">
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
              {/* <li>
                <Link href="/services">
                  <p>Services</p>
                </Link>
              </li> */}
              <li>
                <Link href="/contacts">
                  <p>Contact</p>
                </Link>
              </li>
            </ul>
            {/* <Button /> */}
          </div>
        </div>
      </div>

  );
}

export default Navbar;
