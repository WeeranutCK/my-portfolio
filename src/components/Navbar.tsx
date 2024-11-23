"use client";

import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from "./ThemeButton";

const Navbar = () => {
  const [ isOpen ] = useState(false);
  const { theme } = useTheme();

  return (
    <nav className={`fixed w-full z-20 top-0 left-0 p-1 ${
      theme === "light" 
        ? "bg-gray-200/30 backdrop-blur-sm" 
        : "bg-white/5 backdrop-blur-sm"
    }`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className={`self-center text-xl font-semibold whitespace-nowrap text-foreground ${
            theme === "light" ? "" : "text-white"
          }`}>
            Weeranut's Portfolio
          </span>
        </Link>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 gap-5 ${
            isOpen ? 'block' : 'hidden'
          }`}
          id="navbar-sticky"
        >
          <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
            theme === "light" ? "" : "text-white"
          }`}>
            {['Projects'].map((item) => (
              <li key={item}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block py-2 pl-3 pr-4 rounded hover:bg-accent md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="https://www.canva.com/design/DAGL9n8y1LY/CVdwGXhPNFFVuh_KN_wIDQ/view?utm_content=DAGL9n8y1LY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=UNAVAILABLE"
                className="block py-2 pl-3 pr-4 rounded hover:bg-accent md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors duration-200"
              >
                Resume
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
