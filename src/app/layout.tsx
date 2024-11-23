"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import LoadingMiddleware from '@/middleware/LoadingMiddleware';
import React, { useEffect, useState } from 'react';
import './globals.css';

const ThemedLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={theme === 'light' ? 'bg-white' : 'bg-[#151515]'}>
      <Navbar />
      <LoadingMiddleware>
        <main>{children}</main>
      </LoadingMiddleware>
      <Footer />
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemedLayout>{children}</ThemedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
