import {
  Location,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
  WeatherData,
} from "@/types/weather";
import { WEATHER_CONDITIONS } from "./constants";

interface WeatherApiLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

interface WeatherApiCurrent {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}

interface WeatherApiForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    daily_chance_of_rain: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
  hour: WeatherApiHour[];
}

interface WeatherApiHour {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  chance_of_rain: number;
}

interface WeatherApiResponse {
  location: WeatherApiLocation;
  current: WeatherApiCurrent;
  forecast?: {
    forecastday: WeatherApiForecastDay[];
  };
}

interface WeatherApiSearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export function mapLocation(apiLocation: WeatherApiLocation): Location {
  return {
    name: apiLocation.name,
    country: apiLocation.country,
    region: apiLocation.region,
    lat: apiLocation.lat,
    lon: apiLocation.lon,
  };
}

export function mapCurrentWeather(
  apiCurrent: WeatherApiCurrent,
  forecastDay?: WeatherApiForecastDay
): CurrentWeather {
  const conditionCode = apiCurrent.condition.code;
  const localCondition = WEATHER_CONDITIONS[conditionCode] || apiCurrent.condition.text;

  return {
    temp: Math.round(apiCurrent.temp_c),
    feelsLike: Math.round(apiCurrent.feelslike_c),
    condition: localCondition,
    conditionCode: conditionCode,
    iconCode: apiCurrent.condition.icon,
    humidity: apiCurrent.humidity,
    windSpeed: Math.round(apiCurrent.wind_kph),
    tempMin: forecastDay ? Math.round(forecastDay.day.mintemp_c) : undefined,
    tempMax: forecastDay ? Math.round(forecastDay.day.maxtemp_c) : undefined,
    updatedAt: new Date().toISOString(),
  };
}

export function mapHourlyForecast(hours: WeatherApiHour[]): HourlyForecastItem[] {
  const now = new Date();
  
  return hours
    .filter((hour) => new Date(hour.time) >= now)
    .slice(0, 24)
    .map((hour) => ({
      time: hour.time,
      temp: Math.round(hour.temp_c),
      condition: WEATHER_CONDITIONS[hour.condition.code] || hour.condition.text,
      iconCode: hour.condition.icon,
      precipitationProbability: hour.chance_of_rain,
    }));
}

export function mapDailyForecast(forecastDays: WeatherApiForecastDay[]): DailyForecastItem[] {
  return forecastDays.map((day) => ({
    date: day.date,
    tempMin: Math.round(day.day.mintemp_c),
    tempMax: Math.round(day.day.maxtemp_c),
    condition: WEATHER_CONDITIONS[day.day.condition.code] || day.day.condition.text,
    iconCode: day.day.condition.icon,
    precipitationProbability: day.day.daily_chance_of_rain,
  }));
}

export function mapWeatherData(apiResponse: WeatherApiResponse): WeatherData {
  const forecastDays = apiResponse.forecast?.forecastday || [];
  const allHours = forecastDays.flatMap((day) => day.hour);

  return {
    location: mapLocation(apiResponse.location),
    current: mapCurrentWeather(apiResponse.current, forecastDays[0]),
    hourly: mapHourlyForecast(allHours),
    daily: mapDailyForecast(forecastDays),
  };
}

export function mapSearchResults(results: WeatherApiSearchResult[]): Location[] {
  return results.map((result) => ({
    id: String(result.id),
    name: result.name,
    country: result.country,
    region: result.region,
    lat: result.lat,
    lon: result.lon,
  }));
}
