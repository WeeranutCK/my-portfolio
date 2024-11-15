"use client";

import { useTheme } from '@/context/ThemeContext';
import LoadingMiddleware from '@/middleware/LoadingMiddleware';
import React, { useState } from 'react';

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <LoadingMiddleware isLoading={isLoading}>
      <div className="flex justify-evenly items-center">
        <div className={`flex flex-col justify-center items-center p-4 ${
          theme === 'light' ? '' : 'text-white'
        }`}>
          <h1>My Page</h1>
          <button
            onClick={triggerLoading}
            className={`mt-4 px-4 py-2 text-white font-semibold rounded ${
              theme === 'light'
                ? 'bg-[#A91D3A] hover:bg-[#C73659]'
                : 'bg-[#C73659] hover:bg-[#A91D3A]'
            }`}
          >
            Trigger Loading
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">Test</div>
      </div>
    </LoadingMiddleware>
  );
};

export default Page;
