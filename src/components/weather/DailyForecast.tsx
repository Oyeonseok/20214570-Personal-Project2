"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { DailyForecastItem, TemperatureUnit } from "@/types/weather";

interface DailyForecastProps {
  forecast: DailyForecastItem[];
  unit: TemperatureUnit;
}

function convertTemp(temp: number, unit: TemperatureUnit): number {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }
  return temp;
}

function formatDate(dateString: string): { day: string; date: string } {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = days[date.getDay()];

  if (isToday) {
    return { day: "오늘", date: `${date.getMonth() + 1}/${date.getDate()}` };
  }
  if (isTomorrow) {
    return { day: "내일", date: `${date.getMonth() + 1}/${date.getDate()}` };
  }

  return {
    day: `${dayName}요일`,
    date: `${date.getMonth() + 1}/${date.getDate()}`,
  };
}

export function DailyForecast({ forecast, unit }: DailyForecastProps) {
  if (forecast.length === 0) return null;

  const unitSymbol = unit === "celsius" ? "°" : "°F";

  return (
    <Card className="w-full bg-white/80 backdrop-blur border-white/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          주간 예보
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {forecast.map((item, index) => {
          const { day, date } = formatDate(item.date);
          return (
            <div
              key={`${item.date}-${index}`}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3 min-w-[100px]">
                <div>
                  <p className="font-medium text-gray-800">{day}</p>
                  <p className="text-xs text-gray-500">{date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <WeatherIcon
                  iconCode={item.iconCode}
                  condition={item.condition}
                  size="sm"
                />
                <span className="text-sm text-gray-600 min-w-[60px]">
                  {item.condition}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.precipitationProbability !== undefined &&
                  item.precipitationProbability > 0 && (
                    <span className="text-sm text-blue-500 min-w-[40px]">
                      {item.precipitationProbability}%
                    </span>
                  )}
                <div className="flex items-center gap-1 min-w-[80px] justify-end">
                  <span className="font-semibold text-gray-800">
                    {convertTemp(item.tempMax, unit)}
                    {unitSymbol}
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-500">
                    {convertTemp(item.tempMin, unit)}
                    {unitSymbol}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
