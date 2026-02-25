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

    const query = q || (lat && lon ? `${lat},${lon}` : null);

    if (!query) {
      const error = createApiError("INVALID_REQUEST", 400);
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: error.toJSON() },
        { status: 400 }
      );
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: { code: "CONFIG_ERROR", message: "API 키가 설정되지 않았습니다." } },
        { status: 500 }
      );
    }

    const url = `${WEATHER_API_BASE_URL}/forecast.json?key=${apiKey}&q=${encodeURIComponent(query)}&days=7&aqi=no&alerts=no&lang=ko`;

    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      if (response.status === 400) {
        const error = createApiError("NOT_FOUND", 404);
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: error.toJSON() },
          { status: 404 }
        );
      }
      if (response.status === 403) {
        const error = createApiError("RATE_LIMIT", 429);
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: error.toJSON() },
          { status: 429 }
        );
      }
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    const weatherData = mapWeatherData(data);

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
