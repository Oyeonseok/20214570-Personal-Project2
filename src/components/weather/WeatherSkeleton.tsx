"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CurrentWeatherSkeleton() {
  return (
    <Card className="w-full bg-gradient-to-br from-blue-400 to-blue-500 border-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32 bg-white/20" />
            <Skeleton className="h-4 w-24 bg-white/20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
            <div className="space-y-2">
              <Skeleton className="h-16 w-32 bg-white/20" />
              <Skeleton className="h-6 w-20 bg-white/20" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-white/20" />
            <Skeleton className="h-5 w-20 bg-white/20" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
          <Skeleton className="h-12 bg-white/20" />
          <Skeleton className="h-12 bg-white/20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function HourlyForecastSkeleton() {
  return (
    <Card className="w-full bg-white/80 backdrop-blur border-white/20">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DailyForecastSkeleton() {
  return (
    <Card className="w-full bg-white/80 backdrop-blur border-white/20">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function WeatherSkeleton() {
  return (
    <div className="space-y-4">
      <CurrentWeatherSkeleton />
      <HourlyForecastSkeleton />
      <DailyForecastSkeleton />
    </div>
  );
}
