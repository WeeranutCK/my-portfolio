import { ThemeProvider } from '@/context/ThemeContext';
import LoadingMiddleware from '@/middleware/LoadingMiddleware';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <LoadingMiddleware>
            <main className="pt-20">{children}</main>
          </LoadingMiddleware>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
