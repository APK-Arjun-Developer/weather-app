import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length >= 3) {
      onSearch(trimmed);
    }
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full px-4 py-3 pl-12 pr-12 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
        
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          </div>
        )}
      </div>
    </form>
  );
};
