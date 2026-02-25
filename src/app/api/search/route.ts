import { NextRequest, NextResponse } from "next/server";
import { mapSearchResults } from "@/lib/weather-mapper";
import { createApiError, handleApiError } from "@/lib/api-error";
import { GEO_API_BASE_URL } from "@/lib/constants";
import { ApiResponse, Location } from "@/types/weather";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");

    if (!q || q.trim().length < 2) {
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

    const url = `${GEO_API_BASE_URL}/direct?q=${encodeURIComponent(q)}&limit=5&appid=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: { code: "AUTH_ERROR", message: "API 키가 유효하지 않습니다." } },
          { status: 401 }
        );
      }
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    const locations = mapSearchResults(data);

    return NextResponse.json<ApiResponse<Location[]>>({
      success: true,
      data: locations,
    });
  } catch (error) {
    const apiError = handleApiError(error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: apiError.toJSON() },
      { status: apiError.statusCode }
    );
  }
}
