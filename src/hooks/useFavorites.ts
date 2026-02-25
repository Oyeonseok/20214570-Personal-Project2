"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Location } from "@/types/weather";
import { STORAGE_KEYS, MAX_FAVORITES } from "@/lib/constants";

export function useFavorites() {
  const { value: favorites, setValue: setFavorites, isLoaded } = useLocalStorage<Location[]>(
    STORAGE_KEYS.FAVORITES,
    []
  );

  const addFavorite = useCallback(
    (location: Location) => {
      setFavorites((prev) => {
        const exists = prev.some(
          (fav) => fav.lat === location.lat && fav.lon === location.lon
        );
        if (exists) return prev;
        if (prev.length >= MAX_FAVORITES) {
          return [...prev.slice(1), location];
        }
        return [...prev, location];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (location: Location) => {
      setFavorites((prev) =>
        prev.filter(
          (fav) => !(fav.lat === location.lat && fav.lon === location.lon)
        )
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (location: Location) => {
      return favorites.some(
        (fav) => fav.lat === location.lat && fav.lon === location.lon
      );
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (location: Location) => {
      if (isFavorite(location)) {
        removeFavorite(location);
      } else {
        addFavorite(location);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isLoaded,
  };
}
