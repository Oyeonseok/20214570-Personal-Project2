"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { POPULAR_CITIES } from "@/lib/constants";
import { Location } from "@/types/weather";

interface EmptyStateProps {
  onSelectCity: (location: Location) => void;
}

export function EmptyState({ onSelectCity }: EmptyStateProps) {
  return (
    <Card className="w-full bg-white/80 backdrop-blur border-white/20">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-500"
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
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              날씨를 확인할 지역을 선택하세요
            </h3>
            <p className="text-gray-600">
              상단 검색창에서 도시를 검색하거나 아래 추천 도시를 선택하세요
            </p>
          </div>

          <div className="w-full">
            <p className="text-sm text-gray-500 mb-3">추천 도시</p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_CITIES.map((city) => (
                <Button
                  key={city.name}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onSelectCity({
                      name: city.name,
                      country: city.country,
                      lat: city.lat,
                      lon: city.lon,
                    })
                  }
                  className="bg-white hover:bg-blue-50"
                >
                  {city.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
