import { useTheme } from '@/context/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';
import React from 'react';

export const ThemeToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const buttonClasses = compact
    ? 'group inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 p-0 text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur-xl hover:-translate-y-0.5 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-white dark:shadow-black/20'
    : 'group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-2 py-2 text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur-xl hover:-translate-y-0.5 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-white dark:shadow-black/20';
  const iconClasses = isDark ? 'rounded-full bg-slate-100 p-2 text-slate-950' : 'rounded-full bg-slate-900 p-2 text-white';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={buttonClasses}
      aria-label="Toggle theme"
    >
      <span className={compact ? iconClasses.replace(' p-2', '') : iconClasses}>
        {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
      </span>
      {!compact && (
        <span className="pr-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-200">
          {isDark ? 'Black' : 'White'}
        </span>
      )}
    </button>
  );
};
