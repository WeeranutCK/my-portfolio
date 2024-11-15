"use client";

import LoadingMiddleware from '@/middleware/LoadingMiddleware';
import React, { useState } from 'react';

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  return (
    <LoadingMiddleware isLoading={isLoading}>
      <div className="p-4">
        <h1>My Page</h1>
        <button
          onClick={triggerLoading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Trigger Loading
        </button>
      </div>
    </LoadingMiddleware>
  );
};

export default Page;
