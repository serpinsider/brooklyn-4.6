'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from './utils';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ storageKey, children }: { storageKey: string; children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, [storageKey]);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      return next;
    });
  }, [storageKey]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className={cn(
        'p-2 rounded-lg transition-colors',
        theme === 'dark'
          ? 'bg-white/10 hover:bg-white/15 text-white/60 hover:text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
