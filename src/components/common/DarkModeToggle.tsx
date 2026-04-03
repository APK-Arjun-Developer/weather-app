import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-1 shadow-sm"
      aria-label="Toggle dark mode"
    >
      <div
        className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center ${
          !isDark ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        <Sun className="w-4 h-4" />
      </div>
      <div
        className={`px-3 py-1.5 rounded-lg transition-all flex items-center justify-center ${
          isDark ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        <Moon className="w-4 h-4" />
      </div>
    </button>
  );
};
