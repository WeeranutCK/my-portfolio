"use client";
import { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const LoadingOverlay = () => (
    <div
      className="fixed inset-1 flex backdrop-blur-xl"
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(100, 100, 100, 0.8)",
        transition: "opacity 1000ms ease-in-out",
      }}
    >
      <div className="flex flex-col space-x-4 gap-3 items-center drop-shadow-md">
        <Loader 
          className="animate-spin" 
          style={{
            color: theme === "light" ? "#374151" : "#E5E7EB",
            height: "4rem",
            width: "4rem",
          }}
        />
        <div 
          className={`font-medium leading-none`}
          style={{
            color: theme === "light" ? "#374151" : "#E5E7EB",
            fontSize: "1.25rem",
          }}
        >
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
