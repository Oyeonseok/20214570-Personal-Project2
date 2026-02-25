"use client";

import { useState, useCallback, useSyncExternalStore, useEffect } from "react";

function getServerSnapshot<T>(initialValue: T): T {
  return initialValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [isLoaded, setIsLoaded] = useState(false);

  const getSnapshot = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key) {
          callback();
        }
      };
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    },
    [key]
  );

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => getServerSnapshot(initialValue)
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const currentValue = getSnapshot();
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, getSnapshot]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new StorageEvent("storage", { key }));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { value: storedValue, setValue, removeValue, isLoaded };
}
