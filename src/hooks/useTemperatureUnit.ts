"use client";

import { useLocalStorage } from "./useLocalStorage";
import { TemperatureUnit } from "@/types/weather";
import { STORAGE_KEYS } from "@/lib/constants";

export function useTemperatureUnit() {
  const { value: unit, setValue: setUnit, isLoaded } = useLocalStorage<TemperatureUnit>(
    STORAGE_KEYS.TEMPERATURE_UNIT,
    "celsius"
  );

  const toggleUnit = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };

  return { unit, setUnit, toggleUnit, isLoaded };
}
