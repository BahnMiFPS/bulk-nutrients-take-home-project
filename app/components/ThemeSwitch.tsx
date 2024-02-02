'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Button } from '@tremor/react';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      className="focus:outline-none active:outline-none active:bg-none"
      size="xs"
      onClick={toggleTheme}
      icon={theme === 'dark' ? SunIcon : MoonIcon}
    ></Button>
  );
};

export default ThemeSwitch;
