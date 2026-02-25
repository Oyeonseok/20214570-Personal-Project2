import {
  Location,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
  WeatherData,
} from "@/types/weather";
import { WEATHER_CONDITIONS, WEATHER_ICON_MAP } from "./constants";

interface OpenWeatherCurrentResponse {
  coord: { lat: number; lon: number };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: { speed: number };
  name: string;
  sys: { country: string };
}

interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  pop: number;
  dt_txt: string;
}

interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastItem[];
  city: {
    name: string;
    country: string;
    coord: { lat: number; lon: number };
  };
}

interface OpenWeatherGeoResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export function mapLocation(
  current: OpenWeatherCurrentResponse
): Location {
  return {
    name: current.name,
    country: current.sys.country,
    lat: current.coord.lat,
    lon: current.coord.lon,
  };
}

export function mapCurrentWeather(
  current: OpenWeatherCurrentResponse
): CurrentWeather {
  const weather = current.weather[0];
  const condition = WEATHER_CONDITIONS[weather.main] || weather.description;
  const iconUrl = WEATHER_ICON_MAP[weather.icon] || `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return {
    temp: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    condition: condition,
    conditionCode: weather.id,
    iconCode: iconUrl,
    humidity: current.main.humidity,
    windSpeed: Math.round(current.wind.speed * 3.6),
    tempMin: Math.round(current.main.temp_min),
    tempMax: Math.round(current.main.temp_max),
    updatedAt: new Date().toISOString(),
  };
}

export function mapHourlyForecast(
  forecast: OpenWeatherForecastResponse
): HourlyForecastItem[] {
  return forecast.list.slice(0, 8).map((item) => {
    const weather = item.weather[0];
    const iconUrl = WEATHER_ICON_MAP[weather.icon] || `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    return {
      time: item.dt_txt,
      temp: Math.round(item.main.temp),
      condition: WEATHER_CONDITIONS[weather.main] || weather.description,
      iconCode: iconUrl,
      precipitationProbability: Math.round(item.pop * 100),
    };
  });
}

export function mapDailyForecast(
  forecast: OpenWeatherForecastResponse
): DailyForecastItem[] {
  const dailyMap = new Map<string, OpenWeatherForecastItem[]>();

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, []);
    }
    dailyMap.get(date)!.push(item);
  });

  const dailyForecasts: DailyForecastItem[] = [];

  dailyMap.forEach((items, date) => {
    const temps = items.map((i) => i.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const midItem = items[Math.floor(items.length / 2)];
    const weather = midItem.weather[0];
    const iconUrl = WEATHER_ICON_MAP[weather.icon] || `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const avgPop = items.reduce((sum, i) => sum + i.pop, 0) / items.length;

    dailyForecasts.push({
      date: date,
      tempMin: Math.round(minTemp),
      tempMax: Math.round(maxTemp),
      condition: WEATHER_CONDITIONS[weather.main] || weather.description,
      iconCode: iconUrl,
      precipitationProbability: Math.round(avgPop * 100),
    });
  });

  return dailyForecasts.slice(0, 5);
}

export function mapWeatherData(
  current: OpenWeatherCurrentResponse,
  forecast: OpenWeatherForecastResponse
): WeatherData {
  return {
    location: mapLocation(current),
    current: mapCurrentWeather(current),
    hourly: mapHourlyForecast(forecast),
    daily: mapDailyForecast(forecast),
  };
}

export function mapSearchResults(results: OpenWeatherGeoResponse[]): Location[] {
  return results.map((result) => ({
    name: result.local_names?.ko || result.name,
    country: result.country,
    region: result.state,
    lat: result.lat,
    lon: result.lon,
  }));
}
