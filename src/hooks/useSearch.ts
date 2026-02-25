"use client";

import { useState, useCallback } from "react";
import { Location, ApiResponse } from "@/types/weather";

export function useSearch() {
  const [results, setResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data: ApiResponse<Location[]> = await response.json();

      if (data.success && data.data) {
        setResults(data.data);
      } else {
        setResults([]);
        if (data.error) {
          setError(data.error.message);
        }
      }
    } catch {
      setError("검색 중 오류가 발생했습니다.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
  };
}
