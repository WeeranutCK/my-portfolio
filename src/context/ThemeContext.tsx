'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { buildThemeCookie, resolveThemePreference, Theme } from '@/lib/theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme = 'light',
}: Readonly<{ children: React.ReactNode; initialTheme?: Theme }>) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const resolvedTheme = resolveThemePreference({
      storedTheme: localStorage.getItem('theme'),
      prefersDark: globalThis.matchMedia('(prefers-color-scheme: dark)').matches,
    });

    setTheme((currentTheme) => (currentTheme === resolvedTheme ? currentTheme : resolvedTheme));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
    document.cookie = buildThemeCookie(theme, globalThis.location.protocol === 'https:');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
