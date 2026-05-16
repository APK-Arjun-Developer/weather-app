import { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './features/search/SearchBar';
import { SearchHistory } from './features/search/SearchHistory';
import { WeatherCard } from './features/weather/WeatherCard';
import { Forecast } from './features/weather/Forecast';
import { Favorites } from './features/favorites/Favorites';
import { WeatherLegend } from './features/weather/WeatherLegend';
import { DarkModeToggle } from './components/common/DarkModeToggle';
import { UnitToggle } from './components/common/UnitToggle';
import { useLocalStorage } from './hooks/useLocalStorage';
import * as weatherApi from './api/weather';
import { WeatherData, ForecastData, Units } from './types/weather';
import { CloudRain, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useLocalStorage<Units>('weather-units', 'metric');
  const [favorites, setFavorites] = useLocalStorage<string[]>('weather-favorites', []);
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('search-history', []);
  const [isDark, setIsDark] = useLocalStorage('dark-mode', false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [favoritesData, setFavoritesData] = useState<WeatherData[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const fetchWeatherData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherApi.getWeatherData(city, units);
      const forecastData = await weatherApi.getForecastData(city, units);
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Update search history
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== city.toLowerCase());
        return [city, ...filtered].slice(0, 5); // Keep last 5 searches
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch weather data.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherApi.getWeatherByCoords(lat, lon, units);
      const forecastData = await weatherApi.getForecastByCoords(lat, lon, units);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err: any) {
      setError('Failed to fetch weather for your location.');
    } finally {
      setLoading(false);
    }
  }, [units]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Initial load: Try geolocation, fallback to London
    if (!initialLoadDone) {
      setInitialLoadDone(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeatherData('London');
        }
      );
    }
  }, [fetchByCoords, fetchWeatherData, initialLoadDone]);

  const toggleFavorite = (city: string) => {
    setFavorites(prev => 
      prev.includes(city) ? prev.filter(f => f !== city) : [...prev, city]
    );
  };

  const toggleUnits = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  // Fetch weather for all favorites
  const fetchFavoritesData = useCallback(async () => {
    if (favorites.length === 0) {
      setFavoritesData([]);
      return;
    }
    setFavoritesLoading(true);
    try {
      const data = await Promise.all(
        favorites.map(city => weatherApi.getWeatherData(city, units))
      );
      setFavoritesData(data);
    } catch (err) {
      console.error('Failed to fetch favorites data', err);
    } finally {
      setFavoritesLoading(false);
    }
  }, [favorites, units]);

  useEffect(() => {
    fetchFavoritesData();
  }, [fetchFavoritesData]);

  // Refresh data when units change
  useEffect(() => {
    if (weather) {
      fetchWeatherData(weather.name);
    }
  }, [units]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
              <CloudRain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight" style={{ color: 'blue' }}>SkyCast</h1>
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Weather Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigator.geolocation.getCurrentPosition(
                (p) => fetchByCoords(p.coords.latitude, p.coords.longitude),
                () => setError('Location access denied')
              )}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
              title="Use current location"
            >
              <MapPin className="w-5 h-5" />
            </button>
            <UnitToggle units={units} onToggle={toggleUnits} />
            <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </header>

        <main>
          <SearchBar onSearch={fetchWeatherData} isLoading={loading} />
          
          <SearchHistory 
            history={searchHistory}
            onSelect={fetchWeatherData}
            onClear={() => setSearchHistory([])}
            onRemove={(city) => setSearchHistory(searchHistory.filter(c => c !== city))}
          />

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">Fetching weather data...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-3xl p-8 flex flex-col items-center text-center"
              >
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Oops! Something went wrong</h3>
                <p className="text-red-600 dark:text-red-500/80 max-w-md">{error}</p>
                <button
                  onClick={() => fetchWeatherData('London')}
                  className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  Try London
                </button>
              </motion.div>
            ) : weather && forecast ? (
              <div key="content">
                <WeatherCard
                  data={weather}
                  units={units}
                  isFavorite={favorites.includes(weather.name)}
                  onToggleFavorite={toggleFavorite}
                />
                <Forecast data={forecast} units={units} />
              </div>
            ) : null}
          </AnimatePresence>

          <Favorites
            favoritesData={favoritesData}
            isLoading={favoritesLoading}
            units={units}
            onSelect={fetchWeatherData}
            onRemove={(city) => setFavorites(favorites.filter(f => f !== city))}
          />

          <WeatherLegend />
        </main>

        <footer className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-zinc-400 dark:text-zinc-600 text-sm">
            Data provided by OpenWeather API • Built with React & Tailwind
          </p>
        </footer>
      </div>
    </div>
  );
}
