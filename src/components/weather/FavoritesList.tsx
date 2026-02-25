"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types/weather";

interface FavoritesListProps {
  favorites: Location[];
  onSelect: (location: Location) => void;
  onRemove: (location: Location) => void;
}

export function FavoritesList({
  favorites,
  onSelect,
  onRemove,
}: FavoritesListProps) {
  if (favorites.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <svg
          className="w-4 h-4 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-sm font-medium text-gray-600">즐겨찾기</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((location) => (
          <Badge
            key={`${location.lat}-${location.lon}`}
            variant="secondary"
            className="pl-3 pr-1 py-1.5 bg-white/80 hover:bg-white cursor-pointer group"
          >
            <span
              onClick={() => onSelect(location)}
              className="mr-1"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect(location)}
            >
              {location.name}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full opacity-50 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(location);
              }}
              aria-label={`${location.name} 즐겨찾기에서 제거`}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
