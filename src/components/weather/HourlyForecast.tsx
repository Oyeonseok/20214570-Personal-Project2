"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { WeatherIcon } from "./WeatherIcon";
import { HourlyForecastItem, TemperatureUnit } from "@/types/weather";

interface HourlyForecastProps {
  forecast: HourlyForecastItem[];
  unit: TemperatureUnit;
}

function convertTemp(temp: number, unit: TemperatureUnit): number {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }
  return temp;
}

function formatTime(timeString: string): string {
  const date = new Date(timeString);
  const hours = date.getHours();
  return `${hours}시`;
}

export function HourlyForecast({ forecast, unit }: HourlyForecastProps) {
  if (forecast.length === 0) return null;

  const unitSymbol = unit === "celsius" ? "°" : "°F";

  return (
    <Card className="w-full bg-white/80 backdrop-blur border-white/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          시간대별 예보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-2">
            {forecast.slice(0, 24).map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className="flex flex-col items-center gap-1 min-w-[60px]"
              >
                <span className="text-sm text-gray-500">
                  {index === 0 ? "지금" : formatTime(item.time)}
                </span>
                <WeatherIcon
                  iconCode={item.iconCode}
                  condition={item.condition}
                  size="sm"
                />
                <span className="font-semibold text-gray-800">
                  {convertTemp(item.temp, unit)}
                  {unitSymbol}
                </span>
                {item.precipitationProbability !== undefined &&
                  item.precipitationProbability > 0 && (
                    <span className="text-xs text-blue-500">
                      {item.precipitationProbability}%
                    </span>
                  )}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
