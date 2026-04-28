"use client";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}

const LoadingOverlay = ({
  theme,
  visible,
  progress,
}: Readonly<{ theme: "light" | "dark"; visible: boolean; progress: number }>) => (
  <div
    className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden backdrop-blur-xl"
    style={{
      position: "fixed",
      zIndex: 9999,
      backgroundColor:
        theme === "light" ? "rgba(248, 250, 252, 0.72)" : "rgba(2, 6, 23, 0.8)",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 450ms cubic-bezier(0.16,1,0.3,1)",
    }}
  >
    <div
      className="pointer-events-none absolute -left-10 top-16 h-40 w-40 rounded-full blur-3xl"
      style={{
        background:
          theme === "light"
            ? "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)"
            : "radial-gradient(circle, rgba(96,165,250,0.18), transparent 70%)",
      }}
    />
    <div
      className="pointer-events-none absolute bottom-10 right-10 h-52 w-52 rounded-full blur-3xl"
      style={{
        background:
          theme === "light"
            ? "radial-gradient(circle, rgba(139,92,246,0.14), transparent 72%)"
            : "radial-gradient(circle, rgba(167,139,250,0.14), transparent 72%)",
      }}
    />

    <div className="glass-panel relative flex w-[min(92vw,24rem)] flex-col items-center gap-6 rounded-[32px] px-8 py-8 shadow-2xl md:px-10 md:py-9">
      <div className="eyebrow px-4 py-2 text-[0.58rem] tracking-[0.24em]">Preparing view</div>

      <div className="relative flex h-20 w-20 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              theme === "light"
                ? "radial-gradient(circle, rgba(59,130,246,0.12), transparent 68%)"
                : "radial-gradient(circle, rgba(96,165,250,0.16), transparent 68%)",
          }}
        />
        <div className="relative h-14 w-14">
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Track */}
          <circle
            cx="28"
            cy="28"
            r="22"
            strokeWidth="3.5"
            stroke={theme === "light" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"}
          />
          {/* Animated arc */}
          <circle
            cx="28"
            cy="28"
            r="22"
            strokeWidth="3.5"
            stroke={theme === "light" ? "#3b82f6" : "#93c5fd"}
            strokeLinecap="round"
            strokeDasharray="138.2"
            strokeDashoffset="0"
            style={{ animation: "loading-spin-arc 1.1s cubic-bezier(0.4,0,0.2,1) infinite" }}
          />
        </svg>
        {/* Inner pulsing dot */}
        <div
          className="absolute inset-0 m-auto h-3 w-3 rounded-full"
          style={{
            backgroundColor: theme === "light" ? "#3b82f6" : "#93c5fd",
            animation: "loading-dot-pulse 1.1s ease-in-out infinite",
          }}
        />
      </div>
      </div>

      <div className="space-y-2 text-center">
        <div className="text-lg font-semibold text-slate-950 dark:text-slate-50">Loading content</div>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Smoothing out the next section and syncing the theme.
        </p>
      </div>

      <div className="w-full space-y-2">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{
            background:
              theme === "light" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background:
                theme === "light"
                  ? "linear-gradient(90deg,#3b82f6,#8b5cf6)"
                  : "linear-gradient(90deg,#60a5fa,#a78bfa)",
              boxShadow:
                theme === "light"
                  ? "0 0 18px rgba(59,130,246,0.28)"
                  : "0 0 20px rgba(96,165,250,0.26)",
              transition: "width 280ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
        <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          <span>Loading</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <div
        className="absolute inset-x-6 top-0 h-px"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)"
              : "linear-gradient(90deg, transparent, rgba(96,165,250,0.32), transparent)",
        }}
      />
    </div>
  </div>
);

const LoadingMiddleware: React.FC<Props> = ({ children, isLoading = false }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    if (isLoading) {
      setShouldRender(true);
      setProgress(0);
      // Small tick to allow the element to mount before fading in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      progressTimerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 82) {
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            return 82;
          }
          return p + Math.random() * 14 + 4;
        });
      }, 240);
    } else {
      setProgress(100);
      setVisible(false);
      hideTimerRef.current = setTimeout(() => {
        setShouldRender(false);
        setProgress(0);
      }, 500);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isLoading]);

  return (
    <div>
      {children}
      {mounted &&
        shouldRender &&
        createPortal(
          <LoadingOverlay theme={theme} visible={visible} progress={progress} />,
          document.body
        )}
    </div>
  );
};

export default LoadingMiddleware;
