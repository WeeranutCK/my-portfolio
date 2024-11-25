"use client";

import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed w-full z-20 top-0 left-0 p-1 transition-all duration-300 ease-in-out ${
        theme === "light"
          ? "bg-gray-200/30 backdrop-blur-sm"
          : "bg-white/4 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span
            className={`self-center text-xl font-semibold whitespace-nowrap text-foreground ${
              theme === "light" ? "" : "text-white"
            }`}
          >
            Weeranut's Portfolio
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent"
          aria-controls="navbar-sticky"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 -translate-x-2 ${theme === "light" ? "text-gray-800" : "text-white"}`}
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
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 gap-5 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isOpen ? "max-h-[500px]" : "max-h-0 md:max-h-[500px]"
          }`}
          id="navbar-sticky"
        >
          <ul
            className={`flex flex-col gap-1 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 [&>li]:flex [&>li]:justify-center ${
              theme === "light" ? "" : "text-white"
            }`}
          >
            {["Projects"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block py-2 pl-3 pr-4 rounded"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="https://www.canva.com/design/DAGL9n8y1LY/CVdwGXhPNFFVuh_KN_wIDQ/view?utm_content=DAGL9n8y1LY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=UNAVAILABLE"
                className="block py-2 pl-3 pr-4 rounded"
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
