import React from 'react';
import { Info } from 'lucide-react';

export const WeatherLegend: React.FC = () => {
  const conditions = [
    { icon: '01d', label: 'Clear Sky', desc: 'Sunny and bright' },
    { icon: '02d', label: 'Few Clouds', desc: 'Partly cloudy' },
    { icon: '03d', label: 'Scattered', desc: 'Mostly cloudy' },
    { icon: '04d', label: 'Broken', desc: 'Overcast' },
    { icon: '09d', label: 'Shower Rain', desc: 'Light rain' },
    { icon: '10d', label: 'Rain', desc: 'Heavy rain' },
    { icon: '11d', label: 'Thunderstorm', desc: 'Stormy weather' },
    { icon: '13d', label: 'Snow', desc: 'Freezing weather' },
    { icon: '50d', label: 'Mist', desc: 'Foggy or hazy' },
  ];

  return (
    <div className="mt-12 p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Info className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Weather Icon Guide</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {conditions.map((item) => (
          <div key={item.icon} className="flex flex-col items-center text-center group">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-2xl mb-2 group-hover:scale-110 transition-transform">
              <img 
                src={`https://openweathermap.org/img/wn/${item.icon}.png`} 
                alt={item.label}
                className="w-10 h-10"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{item.label}</p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-tighter mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
