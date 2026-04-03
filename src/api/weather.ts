import axios from 'axios';
import { WeatherData, ForecastData, Units } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
console.log('API Key:', API_KEY); // Debugging line to check if the API key is loaded correctly
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  },
});

export const getWeatherData = async (city: string, units: Units): Promise<WeatherData> => {
  const { data } = await apiClient.get('/weather', { params: { q: city, units } });
  return data;
};

export const getWeatherByCoords = async (lat: number, lon: number, units: Units): Promise<WeatherData> => {
  const { data } = await apiClient.get('/weather', { params: { lat, lon, units } });
  return data;
};

export const getForecastData = async (city: string, units: Units): Promise<ForecastData> => {
  const { data } = await apiClient.get('/forecast', { params: { q: city, units } });
  return data;
};

export const getForecastByCoords = async (lat: number, lon: number, units: Units): Promise<ForecastData> => {
  const { data } = await apiClient.get('/forecast', { params: { lat, lon, units } });
  return data;
};
