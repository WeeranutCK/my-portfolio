"use client";

import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}

const LoadingMiddleware: React.FC<Props> = ({
  children,
  isLoading = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const LoadingOverlay = () => (
    <div
      className="fixed inset-1 flex"
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="flex space-x-4">
        <Loader className="w-16 h-16 animate-spin text-blue-500" />
        <div className="text-gray-700 text-xl font-medium leading-none">
          Loading...
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {children}
      {mounted && isLoading && createPortal(<LoadingOverlay />, document.body)}
    </div>
  );
};

export default LoadingMiddleware;
