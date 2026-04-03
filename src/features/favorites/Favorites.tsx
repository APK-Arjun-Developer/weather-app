import React from 'react';
import { Heart, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { WeatherData, Units } from '../../types/weather';
import { formatTemp } from '../../utils/helpers';

interface FavoritesProps {
  favoritesData: WeatherData[];
  isLoading?: boolean;
  units: Units;
  onSelect: (city: string) => void;
  onRemove: (city: string) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ favoritesData, isLoading, units, onSelect, onRemove }) => {
  if (!isLoading && favoritesData.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Heart className="w-5 h-5 text-red-500 fill-current" />
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Favorite Locations</h3>
      </div>
      
      <div className="overflow-hidden bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Updating favorites...</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-bottom border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Temp</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {favoritesData.map((city) => (
                <tr 
                  key={city.name}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{city.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`} 
                        alt={city.weather[0].description}
                        className="w-8 h-8"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">{city.weather[0].description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatTemp(city.main.temp, units)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelect(city.name)}
                        className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        title="View details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemove(city.name)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
