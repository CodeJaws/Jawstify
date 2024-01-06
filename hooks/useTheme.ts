import { useCallback, useEffect, useMemo, useState } from 'react';

type ThemeKey = 'light' | 'dark';

type ReturnType = {
  themeMode: ThemeKey;
  isDarkMode: boolean;
  setThemeMode: (themeMode: ThemeKey) => void;
  toggleThemeMode: () => void;
};

const useTheme = (): ReturnType => {
  const [themeMode, setThemeMode] = useState<ThemeKey>('light');
  const isDarkMode = useMemo(() => themeMode === 'dark', [themeMode]);

  const initTheme = useCallback(() => {
    const preferDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initalTheme = (localStorage?.getItem('theme') || (preferDarkMode ? 'dark' : 'light')) as ThemeKey;
    setThemeMode(initalTheme);
  }, []);

  useEffect(() => {
    initTheme();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
    document.body.dataset.theme = themeMode;
  }, [themeMode]);

  const toggleThemeMode = useCallback(() => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { themeMode, isDarkMode, setThemeMode, toggleThemeMode };
};

export default useTheme;
