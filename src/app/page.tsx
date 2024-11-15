"use client";

import { useTheme } from '@/context/ThemeContext';
import React from 'react';

const Page: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-evenly items-center h-full">
      <div className={`flex flex-col justify-center items-center${
        theme === 'light' ? '' : 'text-white'
      }`}>
        <div className="text-4xl font-black">Weeranut Chayakul</div>
      </div>
      <div className="flex flex-col justify-center items-center">Test</div>
    </div>
  );
};

export default Page;
