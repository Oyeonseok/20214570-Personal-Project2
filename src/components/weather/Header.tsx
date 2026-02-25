"use client";

import { Button } from "@/components/ui/button";
import { TemperatureUnit } from "@/types/weather";

interface HeaderProps {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

export function Header({ unit, onUnitChange }: HeaderProps) {
  return (
    <header className="w-full py-4 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-blue-500"
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
          <h1 className="text-xl font-bold text-gray-800">날씨</h1>
        </div>

        <div className="flex items-center gap-1 bg-white/50 rounded-full p-1">
          <Button
            variant={unit === "celsius" ? "default" : "ghost"}
            size="sm"
            onClick={() => onUnitChange("celsius")}
            className="rounded-full px-3 h-8"
            aria-label="섭씨 단위로 변경"
          >
            °C
          </Button>
          <Button
            variant={unit === "fahrenheit" ? "default" : "ghost"}
            size="sm"
            onClick={() => onUnitChange("fahrenheit")}
            className="rounded-full px-3 h-8"
            aria-label="화씨 단위로 변경"
          >
            °F
          </Button>
        </div>
      </div>
    </header>
  );
}
