export const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";

export const DEFAULT_LOCATION: { lat: number; lon: number; name: string } = {
  lat: 37.5665,
  lon: 126.978,
  name: "Seoul",
};

export const POPULAR_CITIES = [
  { name: "서울", lat: 37.5665, lon: 126.978, country: "South Korea" },
  { name: "부산", lat: 35.1796, lon: 129.0756, country: "South Korea" },
  { name: "인천", lat: 37.4563, lon: 126.7052, country: "South Korea" },
  { name: "대구", lat: 35.8714, lon: 128.6014, country: "South Korea" },
  { name: "대전", lat: 36.3504, lon: 127.3845, country: "South Korea" },
] as const;

export const STORAGE_KEYS = {
  FAVORITES: "weather_favorites",
  RECENT_SEARCHES: "weather_recent_searches",
  TEMPERATURE_UNIT: "weather_temperature_unit",
} as const;

export const MAX_RECENT_SEARCHES = 5;
export const MAX_FAVORITES = 10;

export const WEATHER_CONDITIONS: Record<number, string> = {
  1000: "맑음",
  1003: "구름 조금",
  1006: "구름 많음",
  1009: "흐림",
  1030: "안개",
  1063: "가끔 비",
  1066: "가끔 눈",
  1069: "가끔 진눈깨비",
  1072: "가끔 이슬비",
  1087: "천둥",
  1114: "눈보라",
  1117: "폭설",
  1135: "안개",
  1147: "짙은 안개",
  1150: "이슬비",
  1153: "이슬비",
  1168: "어는 이슬비",
  1171: "강한 어는 이슬비",
  1180: "가끔 비",
  1183: "약한 비",
  1186: "때때로 비",
  1189: "비",
  1192: "때때로 강한 비",
  1195: "강한 비",
  1198: "약한 어는 비",
  1201: "강한 어는 비",
  1204: "약한 진눈깨비",
  1207: "강한 진눈깨비",
  1210: "가끔 약한 눈",
  1213: "약한 눈",
  1216: "가끔 눈",
  1219: "눈",
  1222: "가끔 강한 눈",
  1225: "강한 눈",
  1237: "우박",
  1240: "약한 소나기",
  1243: "소나기",
  1246: "강한 소나기",
  1249: "약한 진눈깨비 소나기",
  1252: "강한 진눈깨비 소나기",
  1255: "약한 눈 소나기",
  1258: "강한 눈 소나기",
  1261: "약한 우박 소나기",
  1264: "강한 우박 소나기",
  1273: "천둥 번개와 가끔 비",
  1276: "천둥 번개와 비",
  1279: "천둥 번개와 가끔 눈",
  1282: "천둥 번개와 눈",
};
