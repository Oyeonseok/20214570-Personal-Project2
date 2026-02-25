"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeatherIcon } from "./WeatherIcon";
import { CurrentWeather, Location, TemperatureUnit } from "@/types/weather";

interface CurrentWeatherCardProps {
  location: Location;
  weather: CurrentWeather;
  unit: TemperatureUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function convertTemp(temp: number, unit: TemperatureUnit): number {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }
  return temp;
}

export function CurrentWeatherCard({
  location,
  weather,
  unit,
  isFavorite,
  onToggleFavorite,
}: CurrentWeatherCardProps) {
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  return (
    <Card className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{location.name}</h2>
            <p className="text-blue-100 text-sm">
              {location.region && `${location.region}, `}
              {location.country}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className="text-white hover:bg-white/20"
            aria-label={isFavorite ? "즐겨찾기에서 제거" : "즐겨찾기에 추가"}
          >
            <svg
              className="w-6 h-6"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <WeatherIcon
              iconCode={weather.iconCode}
              condition={weather.condition}
              size="xl"
            />
            <div>
              <div className="text-6xl font-light">
                {convertTemp(weather.temp, unit)}
                <span className="text-3xl">{unitSymbol}</span>
              </div>
              <p className="text-blue-100 text-lg">{weather.condition}</p>
            </div>
          </div>

          <div className="text-right space-y-1">
            <p className="text-blue-100">
              체감{" "}
              <span className="text-white font-medium">
                {convertTemp(weather.feelsLike, unit)}
                {unitSymbol}
              </span>
            </p>
            {weather.tempMax !== undefined && weather.tempMin !== undefined && (
              <p className="text-blue-100">
                <span className="text-white font-medium">
                  {convertTemp(weather.tempMax, unit)}°
                </span>
                {" / "}
                <span className="text-white font-medium">
                  {convertTemp(weather.tempMin, unit)}°
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <div>
              <p className="text-blue-200 text-xs">습도</p>
              <p className="font-medium">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            <div>
              <p className="text-blue-200 text-xs">풍속</p>
              <p className="font-medium">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
