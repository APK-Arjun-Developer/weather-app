import React from 'react';
import { Units } from '../../types/weather';

interface UnitToggleProps {
  units: Units;
  onToggle: () => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-1 shadow-sm"
    >
      <div
        className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
          units === 'metric' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        °C
      </div>
      <div
        className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
          units === 'imperial' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 dark:text-zinc-400'
        }`}
      >
        °F
      </div>
    </button>
  );
};
