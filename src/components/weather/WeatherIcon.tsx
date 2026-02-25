"use client";

import Image from "next/image";

interface WeatherIconProps {
  iconCode: string;
  condition: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export function WeatherIcon({ iconCode, condition, size = "md" }: WeatherIconProps) {
  const pixelSize = sizeMap[size];
  const iconUrl = iconCode.startsWith("//") ? `https:${iconCode}` : iconCode;

  return (
    <Image
      src={iconUrl}
      alt={condition}
      width={pixelSize}
      height={pixelSize}
      className="object-contain"
      unoptimized
    />
  );
}
