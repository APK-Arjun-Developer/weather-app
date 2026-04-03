import React from 'react';
import { Wind, Droplets, Heart } from 'lucide-react';
import { WeatherData, Units } from '../../types/weather';
import { formatTemp } from '../../utils/helpers';
import { motion } from 'motion/react';

interface WeatherCardProps {
  data: WeatherData;
  units: 'metric' | 'imperial';
  isFavorite: boolean;
  onToggleFavorite: (city: string) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, units, isFavorite, onToggleFavorite }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-xl border border-zinc-100 dark:border-zinc-700 relative overflow-hidden"
    >
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => onToggleFavorite(data.name)}
          className={`p-2 rounded-full transition-colors ${
            isFavorite ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-zinc-400 bg-zinc-50 dark:bg-zinc-900/20 hover:text-red-400'
          }`}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{data.name}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 capitalize text-lg">{data.weather[0].description}</p>
          <div className="mt-6">
            <span className="text-7xl font-light tracking-tighter text-zinc-900 dark:text-zinc-100">
              {formatTemp(data.main.temp, units)}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center relative z-0">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className="w-40 h-40 drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-700">
        <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl">
          <Droplets className="text-blue-500 w-6 h-6" />
          <div>
            <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Humidity</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl">
          <Wind className="text-teal-500 w-6 h-6" />
          <div>
            <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">Wind Speed</p>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {data.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
