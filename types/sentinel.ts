// ============================================================================
// Master TypeScript Contract: CropScan AI Sentinel
// Shared single-source-of-truth for Workstream A (Engine) and B (Frontend)
// ============================================================================

// ==========================================
// 1. PATHOGEN & COMPUTER VISION TYPES
// ==========================================
export type PathogenId = 
  | 'potato_late_blight' 
  | 'tomato_early_blight' 
  | 'corn_rust' 
  | 'soybean_rust'
  | 'soybean_frogeye'
  | 'corn_northern_blight'
  | 'wheat_rust'
  | 'apple_scab'
  | 'apple_rust'
  | 'powdery_mildew' 
  | 'healthy';

export interface BoundingBox {
  id: string;
  ymin: number; // Normalized percentage: 0 to 100
  xmin: number; // Normalized percentage: 0 to 100
  ymax: number; // Normalized percentage: 0 to 100
  xmax: number; // Normalized percentage: 0 to 100
  label: string;
  confidence: number; // e.g. 96.4
}

export type SeverityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface DiagnosticResult {
  pathogenId: PathogenId;
  commonName: string;
  scientificName: string;
  confidence: number; // Percentage, e.g. 96.4
  necrosisPercentage: number; // Percentage of leaf area infected, e.g. 18.5
  severityLevel: SeverityLevel;
  boundingBoxes: BoundingBox[];
  imageUrl: string;
  scannedAt: string; // ISO timestamp
}

// ==========================================
// 2. WEATHER & ENVIRONMENTAL RISK TYPES
// ==========================================
export type SporeSpreadRisk = 'LOW' | 'ELEVATED' | 'SEVERE';

export interface WeatherTelemetry {
  temperatureC: number;
  relativeHumidity: number;
  windSpeedMph: number;
  condition: string; // e.g. "Overcast / High Humidity"
  sporeSpreadRisk: SporeSpreadRisk;
  wallinIndex: number; // 0 to 4 scale
  summary: string;
}

// ==========================================
// 3. DETERMINISTIC PRESCRIPTION TYPES
// ==========================================
export interface PrescriptiveDosage {
  chemicalName: string; // e.g. "Chlorothalonil 720 SC"
  epaRegNumber: string; // e.g. "EPA Reg. #50534-188"
  activeIngredient: string; // e.g. "Chlorothalonil (54.0%)"
  dosagePerAcre: string; // e.g. "1.5 pt / acre"
  waterVolumePerAcre: string; // e.g. "20 gal / acre"
  safeToSpray: boolean; // false if wind > 10 mph or rainfall imminent
  windBufferNotice: string;
  totalChemicalVolume: string; // e.g. "26.2 Gallons"
  estimatedChemicalCostUsd: number;
}

// ==========================================
// 4. AUTONOMOUS PIPELINE STAGE TYPES
// ==========================================
export type PipelineStageNumber = 1 | 2 | 3 | 4 | 5;

export type PipelineStageStatus = 'idle' | 'running' | 'completed' | 'error';

export interface PipelineStageInfo {
  stage: PipelineStageNumber;
  name: string;
  status: PipelineStageStatus;
  durationMs: number;
  detail: string;
}

// ==========================================
// 5. MASTER WORK ORDER TICKET
// ==========================================
export interface WorkOrderTicket {
  ticketId: string; // e.g. "WO-2026-0941"
  timestamp: string;
  farmName: string;
  sectorId: string; // e.g. "Sector 4B - North Quadrant"
  acreage: number; // e.g. 140
  diagnostic: DiagnosticResult;
  weather: WeatherTelemetry;
  prescription: PrescriptiveDosage;
  estimatedCropSavedUsd: number;
  chemicalSavingsPct: number;
}

// ==========================================
// 6. API REQUEST / RESPONSE CONTRACTS
// ==========================================
export interface WorkflowExecuteRequest {
  sampleId?: PathogenId;
  customImageData?: string | null; // base64 data URL
  sectorId?: string;
  acreage?: number;
  farmName?: string;
}

export interface WorkflowExecuteResponse {
  ticket: WorkOrderTicket;
  stages: PipelineStageInfo[];
  executionTimeMs: number;
  success: boolean;
  message?: string;
}
