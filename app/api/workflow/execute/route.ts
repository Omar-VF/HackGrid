import { NextRequest, NextResponse } from "next/server";
import { executeAutonomousWorkflow } from "@/lib/autonomous-orchestrator";
import { WorkflowExecuteRequest } from "@/types/sentinel";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body: WorkflowExecuteRequest = await request.json();

    const result = await executeAutonomousWorkflow({
      request: body,
      stepDelayMs: 0, // Server-side runs at maximum velocity
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error executing autonomous workflow:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to execute workflow",
      },
      { status: 500 }
    );
  }
}
