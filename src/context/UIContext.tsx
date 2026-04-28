'use client';

import { createContext, useContext, useMemo, useState } from 'react';

interface UIContextType {
  isNavbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const contextValue = useMemo(
    () => ({
      isNavbarVisible,
      setNavbarVisible: setIsNavbarVisible,
    }),
    [isNavbarVisible]
  );

  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
}