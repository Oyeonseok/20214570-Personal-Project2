"use client";

import { Button } from "@/components/ui/button";
import { Location } from "@/types/weather";

interface RecentSearchesProps {
  searches: Location[];
  onSelect: (location: Location) => void;
  onClear: () => void;
}

export function RecentSearches({
  searches,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-600">최근 검색</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-gray-600 h-auto p-1"
        >
          전체 삭제
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((location) => (
          <Button
            key={`${location.lat}-${location.lon}`}
            variant="outline"
            size="sm"
            onClick={() => onSelect(location)}
            className="bg-white/60 hover:bg-white text-gray-700"
          >
            {location.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
