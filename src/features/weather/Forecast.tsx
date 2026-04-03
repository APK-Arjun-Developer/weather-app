import React from 'react';
import { ForecastData, Units } from '../../types/weather';
import { formatTemp } from '../../utils/helpers';
import { motion } from 'motion/react';

interface ForecastProps {
  data: ForecastData;
  units: 'metric' | 'imperial';
}

export const Forecast: React.FC<ForecastProps> = ({ data, units }) => {
  // Filter to get one forecast per day (around noon)
  const dailyForecast = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 px-2">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col items-center text-center"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-16 h-16 my-2"
              referrerPolicy="no-referrer"
            />
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatTemp(day.main.temp, units)}
            </p>
            <p className="text-xs text-zinc-400 capitalize mt-1 line-clamp-1">
              {day.weather[0].description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
