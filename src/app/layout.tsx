import LoadingMiddleware from '@/middleware/LoadingMiddleware';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <LoadingMiddleware>
          <main>{children}</main>
        </LoadingMiddleware>
        <Footer />
      </body>
    </html>
  );
}
