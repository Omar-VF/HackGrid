import { NextRequest, NextResponse } from "next/server";
import { getLiveWeather, DEFAULT_FARM_COORDINATES } from "@/lib/weather";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");

    const latitude = latParam ? parseFloat(latParam) : DEFAULT_FARM_COORDINATES.latitude;
    const longitude = lonParam ? parseFloat(lonParam) : DEFAULT_FARM_COORDINATES.longitude;

    const weather = await getLiveWeather({ latitude, longitude });

    return NextResponse.json(weather, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error in /api/weather route:", error);
    return NextResponse.json(
      { error: "Failed to retrieve weather telemetry" },
      { status: 500 }
    );
  }
}
