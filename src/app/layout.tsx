import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { THEME_INIT_SCRIPT, isTheme } from "@/lib/theme";
import { ThemeProvider } from "@/context/ThemeContext";
import { UIProvider } from "@/context/UIContext";
import { cookies } from "next/headers";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const initialTheme = isTheme(cookieTheme) ? cookieTheme : "light";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${initialTheme === "dark" ? "dark" : ""}`}
      data-theme={initialTheme}
      style={{ colorScheme: initialTheme }}
    >
      <body className="min-h-screen antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider initialTheme={initialTheme}>
          <UIProvider>
            <div className="app-shell theme-transition">
              <Navbar />
              <main className="relative z-10 w-full pt-20 sm:pt-22 md:pt-24 lg:pt-28">{children}</main>
              <Footer />
            </div>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
