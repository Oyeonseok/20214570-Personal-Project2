export const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";
export const GEO_API_BASE_URL = "https://api.openweathermap.org/geo/1.0";

export const DEFAULT_LOCATION: { lat: number; lon: number; name: string } = {
  lat: 37.5665,
  lon: 126.978,
  name: "Seoul",
};

export const POPULAR_CITIES = [
  { name: "서울", lat: 37.5665, lon: 126.978, country: "KR" },
  { name: "부산", lat: 35.1796, lon: 129.0756, country: "KR" },
  { name: "인천", lat: 37.4563, lon: 126.7052, country: "KR" },
  { name: "대구", lat: 35.8714, lon: 128.6014, country: "KR" },
  { name: "대전", lat: 36.3504, lon: 127.3845, country: "KR" },
] as const;

export const STORAGE_KEYS = {
  FAVORITES: "weather_favorites",
  RECENT_SEARCHES: "weather_recent_searches",
  TEMPERATURE_UNIT: "weather_temperature_unit",
} as const;

export const MAX_RECENT_SEARCHES = 5;
export const MAX_FAVORITES = 10;

export const WEATHER_CONDITIONS: Record<string, string> = {
  "Clear": "맑음",
  "Clouds": "구름",
  "Few clouds": "구름 조금",
  "Scattered clouds": "구름 조금",
  "Broken clouds": "구름 많음",
  "Overcast clouds": "흐림",
  "Rain": "비",
  "Light rain": "약한 비",
  "Moderate rain": "비",
  "Heavy rain": "강한 비",
  "Drizzle": "이슬비",
  "Thunderstorm": "천둥번개",
  "Snow": "눈",
  "Light snow": "약한 눈",
  "Heavy snow": "강한 눈",
  "Mist": "안개",
  "Fog": "안개",
  "Haze": "연무",
  "Dust": "먼지",
  "Sand": "황사",
  "Smoke": "연기",
};

export const WEATHER_ICON_MAP: Record<string, string> = {
  "01d": "https://openweathermap.org/img/wn/01d@2x.png",
  "01n": "https://openweathermap.org/img/wn/01n@2x.png",
  "02d": "https://openweathermap.org/img/wn/02d@2x.png",
  "02n": "https://openweathermap.org/img/wn/02n@2x.png",
  "03d": "https://openweathermap.org/img/wn/03d@2x.png",
  "03n": "https://openweathermap.org/img/wn/03n@2x.png",
  "04d": "https://openweathermap.org/img/wn/04d@2x.png",
  "04n": "https://openweathermap.org/img/wn/04n@2x.png",
  "09d": "https://openweathermap.org/img/wn/09d@2x.png",
  "09n": "https://openweathermap.org/img/wn/09n@2x.png",
  "10d": "https://openweathermap.org/img/wn/10d@2x.png",
  "10n": "https://openweathermap.org/img/wn/10n@2x.png",
  "11d": "https://openweathermap.org/img/wn/11d@2x.png",
  "11n": "https://openweathermap.org/img/wn/11n@2x.png",
  "13d": "https://openweathermap.org/img/wn/13d@2x.png",
  "13n": "https://openweathermap.org/img/wn/13n@2x.png",
  "50d": "https://openweathermap.org/img/wn/50d@2x.png",
  "50n": "https://openweathermap.org/img/wn/50n@2x.png",
};
