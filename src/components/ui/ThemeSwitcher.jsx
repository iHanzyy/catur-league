'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    // On component mount, get the current theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      // Check for system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = systemPrefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      applyTheme(initialTheme);
      localStorage.setItem('theme', initialTheme);
    }
  }, []);

  const applyTheme = (newTheme) => {
    // Apply to both documentElement and body
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
    
    // Update data attribute for better CSS targeting
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    console.log('Theme changed to:', newTheme);
  };

  // Don't render the button until we've determined the theme
  if (!theme) return null;

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 transition-colors rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ 
          scale: 1,
          rotate: theme === 'dark' ? 180 : 0 
        }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-5 h-5"
      >
        {theme === 'dark' ? (
          // Sun icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}
