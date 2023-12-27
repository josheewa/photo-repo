"use client";
import React from "react";
import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import MenuItems from "../MenuItems";
import { menuItemsData } from "../menuItemsData";

const Navbar = (toggle) => {
  return (
    <>
      <div className="sticky top-0 z-10 h-20 w-full bg-gray-800">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center justify-between">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18L20 18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <ul className="desktop-nav menus hidden gap-x-6 text-xl text-white md:flex">
              {menuItemsData.map((menu, index) => {
                return <MenuItems items={menu} key={index} />;
              })}
            </ul>
            {/* <ul className="hidden gap-x-6 text-xl text-white md:flex">
              <li>
                <Link href="/">
                  <p>Gallery</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p>Contact</p>
                </Link>
              </li>
            </ul> */}
            <div className="hidden md:block">
              <Button />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="navcontainer sticky top-0 h-30 w-full">

        </div> */}
      {/* <div className="sticky top-30 h-20 w-full">
            <div className="container mx-auto h-full px-4 flex">
                <div className="flex h-full items-center justify-between flex-row">
                    <ul className="hidden gap-x-6 text-white text-xl md:flex">
                        <li>
                            <Link href="/">
                                <p>All</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <p>Landscape</p>

                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <p>Flowers</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/city">
                                <p>City</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <p>Astro</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <p>About</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                <p>Contact</p>
                            </Link>
                        </li>
                    </ul>
                    <div className="hidden md:block">
                        <Button />
                    </div>
                </div>
            </div>
        </div> */}
    </>
  );
};

export default Navbar;
