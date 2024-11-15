"use client"

import { useTheme } from "@/context/ThemeContext";

const Contact = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-1/4 p-14 ${
      theme === 'light' ? 'bg-[#FAF9F6]' : 'bg-[#1c1c1c]'
    }`}>
      <div className="text-2xl font-bold">Contact</div>
    </div>
  );
};

export default Contact;
