import React from 'react';
import { History, X, RotateCcw } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
  onClear: () => void;
  onRemove: (city: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect, onClear, onRemove }) => {
  if (history.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Recent Searches</h3>
        </div>
        <button 
          onClick={onClear}
          className="text-xs font-medium text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((city) => (
          <div
            key={city}
            className="group flex items-center bg-zinc-100 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-lg pl-3 pr-1 py-1 transition-all cursor-pointer"
          >
            <span
              onClick={() => onSelect(city)}
              className="text-sm text-zinc-600 dark:text-zinc-300 mr-2"
            >
              {city}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(city);
              }}
              className="p-1 text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
