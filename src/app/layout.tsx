"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import LoadingMiddleware from '@/middleware/LoadingMiddleware';
import React from 'react';
import './globals.css';

const ThemedLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <body className={theme === 'light' ? 'bg-white' : 'bg-[#151515]'}>
      <Navbar />
      <LoadingMiddleware>
        <main className="h-[200svh]">{children}</main>
      </LoadingMiddleware>
      <Footer />
    </body>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ThemedLayout>{children}</ThemedLayout>
      </ThemeProvider>
    </html>
  );
}
