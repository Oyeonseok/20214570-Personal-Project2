export interface Location {
  id?: string;
  name: string;
  country: string;
  region?: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  condition: string;
  conditionCode: number;
  iconCode: string;
  humidity: number;
  windSpeed: number;
  tempMin?: number;
  tempMax?: number;
  updatedAt: string;
}

export interface HourlyForecastItem {
  time: string;
  temp: number;
  condition: string;
  iconCode: string;
  precipitationProbability?: number;
}

export interface DailyForecastItem {
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  iconCode: string;
  precipitationProbability?: number;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}

export interface SearchResult {
  locations: Location[];
}

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface WeatherError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: WeatherError;
}
