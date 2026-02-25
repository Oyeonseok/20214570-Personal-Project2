"use client";

import { useState, useCallback } from "react";
import { WeatherData, Location, ApiResponse } from "@/types/weather";

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  fetchWeather: (location: Location) => Promise<void>;
  clearWeather: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (location: Location) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        lat: String(location.lat),
        lon: String(location.lon),
      });

      const response = await fetch(`/api/weather?${params}`);
      const data: ApiResponse<WeatherData> = await response.json();

      if (data.success && data.data) {
        setWeatherData(data.data);
      } else {
        setError(data.error?.message || "날씨 정보를 불러올 수 없습니다.");
        setWeatherData(null);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearWeather = useCallback(() => {
    setWeatherData(null);
    setError(null);
  }, []);

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
    clearWeather,
  };
}
