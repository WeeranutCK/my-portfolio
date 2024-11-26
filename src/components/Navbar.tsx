'use client';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-screen px-3 z-20 top-0 left-0 transition-all duration-500 ease-in-out ${
        theme === 'light'
          ? 'bg-gray-200/50 backdrop-blur-2xl'
          : 'bg-white/3  backdrop-blur-2xl'
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span
            className={`self-center text-xl font-semibold whitespace-nowrap text-foreground drop-shadow-md ${
              theme === 'light' 
                ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]' 
                : 'drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]'
            }`}
          >
            Weeranut&apos;s Portfolio
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center pl-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
          aria-controls="navbar-sticky"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 ${
              theme === 'light' ? 'text-gray-800' : 'text-white'
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 gap-5 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            isOpen ? 'max-h-[500px]' : 'max-h-0 md:max-h-[500px]'
          }`}
          id="navbar-sticky"
        >
          <ul
            className={`flex flex-col gap-1 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 [&>li]:flex [&>li]:justify-center ${
              theme === 'light' ? '' : 'text-white'
            }`}
          >
            {['Projects'].map((item) => (
              <li key={item}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`block py-2 pl-3 pr-4 rounded ${
                    theme === 'light' 
                      ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]' 
                      : 'drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]'
                  }`}
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="https://www.canva.com/design/DAGL9n8y1LY/CVdwGXhPNFFVuh_KN_wIDQ/view?utm_content=DAGL9n8y1LY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=UNAVAILABLE"
                className={`block py-2 pl-3 md:pl-0 pr-4 rounded ${
                  theme === 'light' 
                    ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]' 
                    : 'drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)]'
                }`}
                onClick={toggleMenu}
              >
                Resume
              </Link>
            </li>
          </ul>
          <div className="flex justify-center pt-1 md:pt-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;