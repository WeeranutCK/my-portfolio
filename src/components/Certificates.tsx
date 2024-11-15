"use client"

import { useTheme } from "@/context/ThemeContext";

const Certificates = () => {
  const { theme } = useTheme();

  return (
    <div className={`w-full h-1/2 p-14 ${
      theme === 'light' ? 'bg-[#FAF9F6]' : 'bg-[#1c1c1c]'
    }`}>
      <div className="text-2xl font-bold">Certificates</div>
    </div>
  )
}

export default Certificates;