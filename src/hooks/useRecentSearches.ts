"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Location } from "@/types/weather";
import { STORAGE_KEYS, MAX_RECENT_SEARCHES } from "@/lib/constants";

export function useRecentSearches() {
  const { value: recentSearches, setValue: setRecentSearches, isLoaded } =
    useLocalStorage<Location[]>(STORAGE_KEYS.RECENT_SEARCHES, []);

  const addRecentSearch = useCallback(
    (location: Location) => {
      setRecentSearches((prev) => {
        const filtered = prev.filter(
          (item) => !(item.lat === location.lat && item.lon === location.lon)
        );
        const updated = [location, ...filtered];
        return updated.slice(0, MAX_RECENT_SEARCHES);
      });
    },
    [setRecentSearches]
  );

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    isLoaded,
  };
}
