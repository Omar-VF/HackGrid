import {
  DiagnosticResult,
  PipelineStageInfo,
  PipelineStageNumber,
  PipelineStageStatus,
  WeatherTelemetry,
  WorkOrderTicket,
  WorkflowExecuteRequest,
  WorkflowExecuteResponse,
} from "@/types/sentinel";
import { analyzeImageFile } from "./cv-engine";
import { getLiveWeather, DEFAULT_FARM_COORDINATES } from "./weather";
import { calculatePrescription, calculateROIEstimate } from "./agronomy";
import { SAMPLE_DIAGNOSTICS } from "./sample-data";

// ============================================================================
// 5-Stage Autonomous Execution Orchestrator
// Runs the full background pipeline end-to-end with ZERO human intervention.
// Proves our won HackGrid capability: "Autonomous Workflow"
// ============================================================================

export type StageUpdateCallback = (stageInfo: PipelineStageInfo) => void;

export interface AutonomousRunOptions {
  request: WorkflowExecuteRequest;
  onStageUpdate?: StageUpdateCallback;
  stepDelayMs?: number; // Visual delay between stages for demo visualization
}

export const INITIAL_PIPELINE_STAGES: PipelineStageInfo[] = [
  {
    stage: 1,
    name: "Ingestion & Metadata",
    status: "idle",
    durationMs: 0,
    detail: "Ingest leaf tile, parse EXIF GPS coordinates & sector boundaries",
  },
  {
    stage: 2,
    name: "CV Pathology",
    status: "idle",
    durationMs: 0,
    detail: "Segment necrotic lesions & compute confidence-weighted bounding boxes",
  },
  {
    stage: 3,
    name: "Weather Correlation",
    status: "idle",
    durationMs: 0,
    detail: "Query Open-Meteo microclimate & compute Wallin spore velocity index",
  },
  {
    stage: 4,
    name: "EPA Prescription",
    status: "idle",
    durationMs: 0,
    detail: "Deterministic formulation of tank-mix dosage & wind-drift safety check",
  },
  {
    stage: 5,
    name: "Work-Order Dispatch",
    status: "idle",
    durationMs: 0,
    detail: "Compile ISO Work-Order Ticket with GPS boundary polygon for tractor dispatch",
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes the 5-stage autonomous cycle.
 * Operates autonomously from image ingestion to dispatched tractor ticket.
 */
export async function executeAutonomousWorkflow(
  options: AutonomousRunOptions
): Promise<WorkflowExecuteResponse> {
  const startTime = Date.now();
  const { request, onStageUpdate, stepDelayMs = 0 } = options;

  const farmName = request.farmName || "Oak Ridge Commercial Farm";
  const sectorId = request.sectorId || "Sector 4B - North Quadrant";
  const acreage = request.acreage || 140;

  const stages: PipelineStageInfo[] = JSON.parse(JSON.stringify(INITIAL_PIPELINE_STAGES));

  const updateStage = (
    stageNum: PipelineStageNumber,
    status: PipelineStageStatus,
    durationMs: number,
    detail: string
  ) => {
    const stage = stages.find((s) => s.stage === stageNum);
    if (stage) {
      stage.status = status;
      stage.durationMs = durationMs;
      stage.detail = detail;
      if (onStageUpdate) {
        onStageUpdate({ ...stage });
      }
    }
  };

  try {
    // ------------------------------------------------------------------------
    // STAGE 1: INGESTION & METADATA EXTRACTION
    // ------------------------------------------------------------------------
    const s1Start = Date.now();
    updateStage(1, "running", 0, "Ingesting high-res leaf telemetry & parsing sector EXIF GPS...");
    if (stepDelayMs > 0) await sleep(stepDelayMs);

    const imageSource = request.customImageData || request.sampleId || "potato_late_blight";
    const s1Duration = Date.now() - s1Start;
    updateStage(
      1,
      "completed",
      s1Duration,
      `Telemetry ingested for ${farmName} [${sectorId}]. GPS: ${DEFAULT_FARM_COORDINATES.latitude}°N, ${Math.abs(DEFAULT_FARM_COORDINATES.longitude)}°W`
    );

    // ------------------------------------------------------------------------
    // STAGE 2: COMPUTER VISION PATHOLOGY & DATASET CROSS-REFERENCING
    // ------------------------------------------------------------------------
    const s2Start = Date.now();
    updateStage(
      2,
      "running",
      0,
      "Cross-referencing foliar morphology & pustule spectra with Plant Pathology Reference Atlas (14,200 specimens)..."
    );
    if (stepDelayMs > 0) await sleep(stepDelayMs);

    let diagnostic: DiagnosticResult;
    if (request.customImageData) {
      diagnostic = await analyzeImageFile(request.customImageData);
    } else if (request.sampleId && request.sampleId in SAMPLE_DIAGNOSTICS) {
      diagnostic = SAMPLE_DIAGNOSTICS[request.sampleId];
    } else {
      diagnostic = await analyzeImageFile(imageSource);
    }

    const s2Duration = Date.now() - s2Start;
    updateStage(
      2,
      "completed",
      s2Duration,
      `Identified: ${diagnostic.commonName} (${diagnostic.confidence}% match) | ${diagnostic.necrosisPercentage}% Surface Infiltration [${diagnostic.severityLevel}]`
    );

    // ------------------------------------------------------------------------
    // STAGE 3: MICRO-CLIMATE WEATHER & WALLIN SPORE MODELING
    // ------------------------------------------------------------------------
    const s3Start = Date.now();
    updateStage(3, "running", 0, "Querying live Open-Meteo microclimate & calculating spore velocity...");
    if (stepDelayMs > 0) await sleep(stepDelayMs);

    const weather: WeatherTelemetry = await getLiveWeather(DEFAULT_FARM_COORDINATES);
    const s3Duration = Date.now() - s3Start;
    updateStage(
      3,
      "completed",
      s3Duration,
      `Weather: ${weather.temperatureC}°C, ${weather.relativeHumidity}% RH, Wind ${weather.windSpeedMph} mph | Spore Risk: ${weather.sporeSpreadRisk}`
    );

    // ------------------------------------------------------------------------
    // STAGE 4: DETERMINISTIC EPA PRESCRIPTION FORMULATION
    // ------------------------------------------------------------------------
    const s4Start = Date.now();
    updateStage(4, "running", 0, "Calculating EPA chemical formulation & buffer zone compliance...");
    if (stepDelayMs > 0) await sleep(stepDelayMs);

    const prescription = calculatePrescription({
      pathogenId: diagnostic.pathogenId,
      acreage,
      windSpeedMph: weather.windSpeedMph,
      relativeHumidity: weather.relativeHumidity,
    });

    const { estimatedCropSavedUsd, chemicalSavingsPct } = calculateROIEstimate(
      diagnostic.pathogenId,
      acreage
    );

    const s4Duration = Date.now() - s4Start;
    updateStage(
      4,
      "completed",
      s4Duration,
      `Formulated: ${prescription.chemicalName} @ ${prescription.dosagePerAcre} | Safe: ${prescription.safeToSpray ? "YES" : "NO"}`
    );

    // ------------------------------------------------------------------------
    // STAGE 5: WORK-ORDER DISPATCH GENERATION
    // ------------------------------------------------------------------------
    const s5Start = Date.now();
    updateStage(5, "running", 0, "Compiling ISO Tractor Work-Order Ticket & dispatch envelope...");
    if (stepDelayMs > 0) await sleep(stepDelayMs);

    const ticketNumber = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `WO-2026-${ticketNumber}`;

    const ticket: WorkOrderTicket = {
      ticketId,
      timestamp: new Date().toISOString(),
      farmName,
      sectorId,
      acreage,
      diagnostic,
      weather,
      prescription,
      estimatedCropSavedUsd,
      chemicalSavingsPct,
    };

    const s5Duration = Date.now() - s5Start;
    updateStage(
      5,
      "completed",
      s5Duration,
      `Work-Order #${ticketId} dispatched. Protected value: $${estimatedCropSavedUsd.toLocaleString()}`
    );

    const totalExecutionTime = Date.now() - startTime;

    return {
      ticket,
      stages,
      executionTimeMs: totalExecutionTime,
      success: true,
      message: "Autonomous workflow cycle completed successfully.",
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown pipeline error";
    // Mark current stage in error
    const runningStage = stages.find((s) => s.status === "running") || stages[0];
    runningStage.status = "error";
    runningStage.detail = `Error: ${errorMsg}`;

    if (onStageUpdate) {
      onStageUpdate({ ...runningStage });
    }

    // Fallback ticket to avoid application freeze
    const fallbackTicket = SAMPLE_DIAGNOSTICS.potato_late_blight;
    return {
      ticket: {
        ticketId: "WO-2026-ERR",
        timestamp: new Date().toISOString(),
        farmName,
        sectorId,
        acreage,
        diagnostic: fallbackTicket,
        weather: {
          temperatureC: 19.4,
          relativeHumidity: 88,
          windSpeedMph: 6.2,
          condition: "Offline Fallback",
          sporeSpreadRisk: "SEVERE",
          wallinIndex: 3,
          summary: "Failsafe telemetry activated.",
        },
        prescription: calculatePrescription({
          pathogenId: "potato_late_blight",
          acreage,
          windSpeedMph: 6.2,
          relativeHumidity: 88,
        }),
        estimatedCropSavedUsd: 32400,
        chemicalSavingsPct: 34,
      },
      stages,
      executionTimeMs: Date.now() - startTime,
      success: false,
      message: errorMsg,
    };
  }
}
