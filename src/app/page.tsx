"use client";

import { useCallback } from "react";
import {
  Header,
  SearchInput,
  CurrentWeatherCard,
  HourlyForecast,
  DailyForecast,
  WeatherSkeleton,
  ErrorState,
  EmptyState,
  FavoritesList,
  RecentSearches,
} from "@/components/weather";
import {
  useWeather,
  useSearch,
  useTemperatureUnit,
  useFavorites,
  useRecentSearches,
} from "@/hooks";
import { Location } from "@/types/weather";

export default function Home() {
  const { unit, setUnit } = useTemperatureUnit();
  const { weatherData, isLoading, error, fetchWeather } = useWeather();
  const { results, isLoading: isSearching, search } = useSearch();
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  const handleSelectLocation = useCallback(
    (location: Location) => {
      addRecentSearch(location);
      fetchWeather(location);
    },
    [addRecentSearch, fetchWeather]
  );

  const handleRetry = useCallback(() => {
    if (weatherData?.location) {
      fetchWeather(weatherData.location);
    }
  }, [weatherData, fetchWeather]);

  const handleToggleFavorite = useCallback(() => {
    if (weatherData?.location) {
      toggleFavorite(weatherData.location);
    }
  }, [weatherData, toggleFavorite]);

  return (
    <div className="min-h-screen">
      <Header unit={unit} onUnitChange={setUnit} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
        <div className="flex flex-col items-center gap-6">
          <SearchInput
            onSearch={search}
            onSelect={handleSelectLocation}
            results={results}
            isLoading={isSearching}
          />

          {(favorites.length > 0 || recentSearches.length > 0) && !weatherData && (
            <div className="w-full max-w-md space-y-4">
              <FavoritesList
                favorites={favorites}
                onSelect={handleSelectLocation}
                onRemove={removeFavorite}
              />
              <RecentSearches
                searches={recentSearches}
                onSelect={handleSelectLocation}
                onClear={clearRecentSearches}
              />
            </div>
          )}

          <div className="w-full max-w-md space-y-4">
            {isLoading ? (
              <WeatherSkeleton />
            ) : error ? (
              <ErrorState message={error} onRetry={handleRetry} />
            ) : weatherData ? (
              <>
                <CurrentWeatherCard
                  location={weatherData.location}
                  weather={weatherData.current}
                  unit={unit}
                  isFavorite={isFavorite(weatherData.location)}
                  onToggleFavorite={handleToggleFavorite}
                />
                <HourlyForecast forecast={weatherData.hourly} unit={unit} />
                <DailyForecast forecast={weatherData.daily} unit={unit} />
              </>
            ) : (
              <EmptyState onSelectCity={handleSelectLocation} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
