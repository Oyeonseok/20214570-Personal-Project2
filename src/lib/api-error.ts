import { WeatherError } from "@/types/weather";

export class ApiError extends Error {
  code: string;
  statusCode: number;

  constructor(code: string, message: string, statusCode: number = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "ApiError";
  }

  toJSON(): WeatherError {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  API_ERROR: "API_ERROR",
  NOT_FOUND: "NOT_FOUND",
  RATE_LIMIT: "RATE_LIMIT",
  INVALID_REQUEST: "INVALID_REQUEST",
  SERVER_ERROR: "SERVER_ERROR",
  LOCATION_DENIED: "LOCATION_DENIED",
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.NETWORK_ERROR]: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  [ERROR_CODES.API_ERROR]: "날씨 정보를 불러오는 중 오류가 발생했습니다.",
  [ERROR_CODES.NOT_FOUND]: "검색 결과가 없습니다. 다른 지역명을 입력해 주세요.",
  [ERROR_CODES.RATE_LIMIT]: "일시적으로 요청이 제한되었습니다. 잠시 후 다시 시도해 주세요.",
  [ERROR_CODES.INVALID_REQUEST]: "잘못된 요청입니다.",
  [ERROR_CODES.SERVER_ERROR]: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  [ERROR_CODES.LOCATION_DENIED]: "위치 권한이 허용되지 않았습니다. 지역 검색으로 이용해 주세요.",
};

export function createApiError(code: keyof typeof ERROR_CODES, statusCode: number = 500): ApiError {
  return new ApiError(code, ERROR_MESSAGES[code], statusCode);
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.message.includes("fetch")) {
      return createApiError("NETWORK_ERROR", 503);
    }
    return new ApiError("SERVER_ERROR", error.message, 500);
  }

  return createApiError("SERVER_ERROR", 500);
}
