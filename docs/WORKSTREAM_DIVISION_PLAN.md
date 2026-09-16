# CropScan AI Sentinel: Team Workstream Division & Integration Plan

This document is the **single source of truth** for both developers. It defines the exact division of labor, shared TypeScript interfaces, API contracts, component props, and copy-pasteable mock data so that **Workstream A (Backend & Engine)** and **Workstream B (Pure Frontend & UI)** can integrate in under 5 minutes with **zero type errors or merge conflicts**.

---

## 🤝 1. The Master Interface Contract (`types/sentinel.ts`)

Both developers must use these exact interfaces:

```typescript
// ==========================================
// 1. PATHOGEN & COMPUTER VISION TYPES
// ==========================================
export type PathogenId = 
  | 'potato_late_blight' 
  | 'tomato_early_blight' 
  | 'corn_rust' 
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

export interface DiagnosticResult {
  pathogenId: PathogenId;
  commonName: string;
  scientificName: string;
  confidence: number; // Percentage, e.g. 96.4
  necrosisPercentage: number; // Percentage of leaf area infected, e.g. 18.5
  severityLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  boundingBoxes: BoundingBox[];
  imageUrl: string;
  scannedAt: string; // ISO timestamp
}

// ==========================================
// 2. WEATHER & ENVIRONMENTAL RISK TYPES
// ==========================================
export interface WeatherTelemetry {
  temperatureC: number;
  relativeHumidity: number;
  windSpeedMph: number;
  condition: string; // e.g. "Overcast / High Humidity"
  sporeSpreadRisk: 'LOW' | 'ELEVATED' | 'SEVERE';
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
```

---

## 📡 2. API Endpoints Contract

If Developer A provides Next.js Route Handlers (or server actions), here are the exact endpoints and payloads:

### Endpoint 1: `/api/workflow/execute` (POST)
- **Request Body**:
  ```json
  {
    "sampleId": "potato_late_blight",
    "customImageData": null, 
    "sectorId": "Sector 4B",
    "acreage": 140
  }
  ```
- **Response**: Returns the complete `WorkOrderTicket` object above, plus an array of `PipelineStageInfo`.

### Endpoint 2: `/api/weather` (GET)
- **Query Params**: `?lat=44.9778&lon=-93.2650` (or default farm coords)
- **Response**: Returns `WeatherTelemetry` object.

---

## 📦 3. Copy-Paste Mock Data Fixtures (For Frontend Dev B)

Developer B does **not** have to wait for the backend! Copy and paste this exact mock object into your React state to build the entire dashboard immediately:

```typescript
export const MOCK_WORK_ORDER: WorkOrderTicket = {
  ticketId: "WO-2026-0941",
  timestamp: new Date().toISOString(),
  farmName: "Oak Ridge Commercial Farm",
  sectorId: "Sector 4B - North Quadrant",
  acreage: 140,
  diagnostic: {
    pathogenId: "potato_late_blight",
    commonName: "Potato Late Blight",
    scientificName: "Phytophthora infestans",
    confidence: 96.4,
    necrosisPercentage: 18.5,
    severityLevel: "CRITICAL",
    imageUrl: "/samples/potato_late_blight.jpg",
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      { id: "box-1", ymin: 24, xmin: 32, ymax: 58, xmax: 68, label: "Necrotic Lesion", confidence: 96.4 },
      { id: "box-2", ymin: 62, xmin: 55, ymax: 82, xmax: 80, label: "Sporulation Zone", confidence: 92.1 }
    ]
  },
  weather: {
    temperatureC: 19.4,
    relativeHumidity: 88,
    windSpeedMph: 6.2,
    condition: "High Humidity / High Spore Velocity",
    sporeSpreadRisk: "SEVERE",
    wallinIndex: 3,
    summary: "88% RH creates optimal fungal germination within 48 hours."
  },
  prescription: {
    chemicalName: "Chlorothalonil 720 SC",
    epaRegNumber: "EPA Reg. #50534-188",
    activeIngredient: "Chlorothalonil (54.0% w/w)",
    dosagePerAcre: "1.5 pt / acre",
    waterVolumePerAcre: "20 gal / acre",
    safeToSpray: true,
    windBufferNotice: "Wind speed 6.2 mph (< 10 mph EPA limit). Compliant with aquatic buffer zones.",
    totalChemicalVolume: "26.2 Gallons",
    estimatedChemicalCostUsd: 2140
  },
  estimatedCropSavedUsd: 32400,
  chemicalSavingsPct: 34
};
```

---

## 🧩 4. Frontend Component Props Specifications

Here are the exact props for all child components Developer B builds:

```typescript
// TelemetryBar.tsx
export interface TelemetryBarProps {
  farmName: string;
  totalAcreage: number;
  activeSector: string;
  weather: WeatherTelemetry;
}

// AutonomousPipeline.tsx
export interface AutonomousPipelineProps {
  stages: PipelineStageInfo[];
  isRunning: boolean;
  onTriggerRun: () => void;
}

// VisionCanvas.tsx
export interface VisionCanvasProps {
  imageUrl: string;
  boundingBoxes: BoundingBox[];
  isLoading: boolean;
}

// PrescriptionCard.tsx
export interface PrescriptionCardProps {
  prescription: PrescriptiveDosage;
  acreage: number;
}

// WorkOrderTicket.tsx
export interface WorkOrderTicketProps {
  ticket: WorkOrderTicket;
  onDispatch: () => void;
}

// ROICounter.tsx
export interface ROICounterProps {
  cropSavedUsd: number;
  chemicalSavingsPct: number;
}

// SampleSelector.tsx
export interface SampleSelectorProps {
  activeSampleId: PathogenId;
  onSelectSample: (id: PathogenId) => void;
  onUploadCustomImage: (file: File) => void;
  onTriggerCamera: () => void;
}
```

---

## 🔴 5. WORKSTREAM A: The Difficult Section (Core Engine & Backend)
> **Assigned to**: Backend / Core Logic Developer (Math, Computer Vision, Async Pipelines)

### Step-by-Step Checklist:
- [ ] Create `lib/cv-engine.ts`:
  - Calculate normalized percentages `[ymin, xmin, ymax, xmax]` $\to$ canvas coordinates.
  - Draw glowing animated rectangle strokes (`ctx.strokeRect`, `ctx.shadowColor = '#10b981'`).
  - Pre-map the 4 sample leaf images with accurate lesion bounding box anchors.
- [ ] Create `lib/weather.ts`:
  - Query `https://api.open-meteo.com/v1/forecast?latitude=44.97&longitude=-93.26&current=temperature_2m,relative_humidity_2m,wind_speed_10m`.
  - Calculate Wallin Fungal Infection Index.
- [ ] Create `lib/agronomy.ts`:
  - Deterministic formula for Chlorothalonil / Mancozeb dosage based on acreage and severity.
- [ ] Create `lib/autonomous-orchestrator.ts`:
  - An async function that steps through Stage 1 $\to$ 2 $\to$ 3 $\to$ 4 $\to$ 5 over ~3 seconds, returning timed updates to the frontend.

---

## 🟢 6. WORKSTREAM B: The Easygoing Section (Pure Frontend UI & Styling)
> **Assigned to**: Frontend / React UI Developer (Styling, Layout, Copy, Presentation)

### Step-by-Step Checklist:
- [ ] Create `styles/globals.css` with dark glassmorphic tokens (`bg-slate-950`, border `slate-800`, text `emerald-400`).
- [ ] Create `app/layout.tsx` with top navbar showing won constraint badges (`🌾 Agriculture`, `👁️ Computer Vision`, `⚡ Autonomous`, `🚜 Small Businesses`).
- [ ] Create `components/TelemetryBar.tsx` (Farm name, acreage, active alert badge).
- [ ] Create `components/AutonomousPipeline.tsx` (5-stage horizontal progress steps with green animated glow).
- [ ] Create `components/PrescriptionCard.tsx` (Dosage, EPA registration badge, wind buffer alert).
- [ ] Create `components/WorkOrderTicket.tsx` (Formatted printable/downloadable ticket modal).
- [ ] Create `components/ROICounter.tsx` (Animated counter: `$32,400 Crop Value Protected`).
- [ ] Create `app/dashboard/page.tsx` (Assemble the command center layout using `MOCK_WORK_ORDER`).
- [ ] Create `app/page.tsx` (B2B SaaS landing page with $499/mo pricing).
- [ ] Create `app/business/page.tsx` (In-app viewer of the 7 HackGrid judging sections).

---

## 🔗 7. The 5-Minute Merge Protocol

When both developers finish:
1. In `app/dashboard/page.tsx`, replace `MOCK_WORK_ORDER` with the real state returned by `autonomousOrchestrator.runScan()`.
2. Run `npm run build` to verify 100% type safety.
3. Done! Zero merge headaches.
