
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, darkTheme } from './tokens';
import { GlobalStyle } from './global';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface OrionProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export function OrionProvider({ children, defaultMode = 'light' }: OrionProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  // Load from local storage on mount (client-side only)
  useEffect(() => {
    const savedMode = localStorage.getItem('@orion:theme') as ThemeMode;
    if (savedMode && ['light', 'dark'].includes(savedMode)) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Optional: Auto detect system preference
      // setMode('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('@orion:theme', newMode);
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('@orion:theme', newMode);
  }

  const currentTheme = mode === 'light' ? theme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle theme={currentTheme} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within an OrionProvider');
  }
  return context;
}