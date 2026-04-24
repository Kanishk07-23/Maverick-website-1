'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const handleToggle = () => {
    // Add the transitioning class for a smooth switch,
    // then remove it after the transition completes.
    // This avoids the always-on transition that lagggs every page load.
    document.documentElement.classList.add('theme-transitioning');
    setTheme(theme === 'light' ? 'dark' : 'light');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 400);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent hover:bg-muted transition-colors border border-transparent hover:border-border text-foreground"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
