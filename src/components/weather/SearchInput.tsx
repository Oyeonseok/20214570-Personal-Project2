"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Location } from "@/types/weather";

interface SearchInputProps {
  onSearch: (query: string) => void;
  onSelect: (location: Location) => void;
  results: Location[];
  isLoading: boolean;
  placeholder?: string;
}

export function SearchInput({
  onSearch,
  onSelect,
  results,
  isLoading,
  placeholder = "도시명을 입력하세요",
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(() => {
        onSearch(query);
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [query, onSearch]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [results]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setIsOpen(false);
    }
  }, []);

  const handleSelect = useCallback((location: Location) => {
    onSelect(location);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  }, [onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  }, [isOpen, results, highlightedIndex, handleSelect]);

  const handleFocus = useCallback(() => {
    if (query.length >= 2) {
      setIsOpen(true);
    }
  }, [query.length]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setIsOpen(false), 200);
  }, []);

  const handleSearchClick = useCallback(() => {
    if (query.length >= 2) {
      onSearch(query);
    }
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="pl-10 h-12 bg-white/80 backdrop-blur border-white/20 focus:bg-white"
            aria-label="지역 검색"
            aria-expanded={isOpen}
            aria-controls="search-results"
            aria-autocomplete="list"
          />
        </div>
        <Button
          type="button"
          onClick={handleSearchClick}
          disabled={query.length < 2}
          className="h-12 px-6"
          aria-label="검색"
        >
          검색
        </Button>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id="search-results"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-auto"
        >
          {isLoading ? (
            <li className="px-4 py-3 text-gray-500 text-center">검색 중...</li>
          ) : results.length > 0 ? (
            results.map((location, index) => (
              <li
                key={`${location.lat}-${location.lon}`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  highlightedIndex === index
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleSelect(location)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-gray-500">
                  {location.region && `${location.region}, `}
                  {location.country}
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-gray-500 text-center">
              검색 결과가 없습니다
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
