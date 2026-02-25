import { NextRequest, NextResponse } from "next/server";
import { mapWeatherData } from "@/lib/weather-mapper";
import { createApiError, handleApiError } from "@/lib/api-error";
import { WEATHER_API_BASE_URL } from "@/lib/constants";
import { ApiResponse, WeatherData } from "@/types/weather";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const q = searchParams.get("q");

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: { code: "CONFIG_ERROR", message: "API 키가 설정되지 않았습니다." } },
        { status: 500 }
      );
    }

    let currentUrl: string;
    let forecastUrl: string;

    if (lat && lon) {
      currentUrl = `${WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
      forecastUrl = `${WEATHER_API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
    } else if (q) {
      currentUrl = `${WEATHER_API_BASE_URL}/weather?q=${encodeURIComponent(q)}&appid=${apiKey}&units=metric&lang=kr`;
      forecastUrl = `${WEATHER_API_BASE_URL}/forecast?q=${encodeURIComponent(q)}&appid=${apiKey}&units=metric&lang=kr`;
    } else {
      const error = createApiError("INVALID_REQUEST", 400);
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: error.toJSON() },
        { status: 400 }
      );
    }

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl, { next: { revalidate: 600 } }),
      fetch(forecastUrl, { next: { revalidate: 600 } }),
    ]);

    if (!currentResponse.ok) {
      if (currentResponse.status === 404) {
        const error = createApiError("NOT_FOUND", 404);
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: error.toJSON() },
          { status: 404 }
        );
      }
      if (currentResponse.status === 401) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: { code: "AUTH_ERROR", message: "API 키가 유효하지 않습니다." } },
          { status: 401 }
        );
      }
      if (currentResponse.status === 429) {
        const error = createApiError("RATE_LIMIT", 429);
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: error.toJSON() },
          { status: 429 }
        );
      }
      throw new Error(`API responded with status ${currentResponse.status}`);
    }

    const [currentData, forecastData] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json(),
    ]);

    const weatherData = mapWeatherData(currentData, forecastData);

    return NextResponse.json<ApiResponse<WeatherData>>({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    const apiError = handleApiError(error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: apiError.toJSON() },
      { status: apiError.statusCode }
    );
  }
}
