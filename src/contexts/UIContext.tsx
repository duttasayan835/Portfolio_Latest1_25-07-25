import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UIContextType {
  isLiquidGlass: boolean;
  toggleLiquidGlass: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLiquidGlass, setIsLiquidGlass] = useState(() => {
    // Initialize from localStorage or default to false
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('isLiquidGlass');
      return storedValue ? JSON.parse(storedValue) : false;
    }
    return false;
  });

  const toggleLiquidGlass = () => {
    setIsLiquidGlass(prev => !prev);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLiquidGlass', JSON.stringify(isLiquidGlass));
      if (isLiquidGlass) {
        document.documentElement.classList.add('liquid-glass-enabled');
      } else {
        document.documentElement.classList.remove('liquid-glass-enabled');
      }
    }
  }, [isLiquidGlass]);

  return (
    <UIContext.Provider value={{ isLiquidGlass, toggleLiquidGlass }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};