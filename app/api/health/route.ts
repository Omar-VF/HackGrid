import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "operational",
    service: "CropScan AI Sentinel Engine",
    version: "1.0.0",
    hackathonConstraints: {
      team: "CopyPasta",
      track: "Agriculture",
      aiRights: "Computer Vision (Zero LLM Generative AI)",
      aiCapability: "Autonomous Workflow (5-Stage Loop)",
      customerSegment: "Small Businesses (Commercial Family Farms)",
    },
    engineModules: {
      computerVision: "Active (Geometry normalizer & canvas renderer)",
      weatherIntegration: "Active (Open-Meteo & Wallin Index model)",
      agronomyFormulary: "Active (EPA Chlorothalonil/Mancozeb/Azoxystrobin)",
      autonomousOrchestrator: "Active (Stages 1-5 state machine)",
    },
  });
}
