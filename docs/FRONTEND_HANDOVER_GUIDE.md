# Frontend Developer Handover Guide: CropEye

> **For Frontend Dev (Workstream B)**:  
> The entire backend engine, live weather API, deterministic agronomy formulations, computer vision math, and autonomous 5-stage orchestrator are **100% complete, tested, and passing all 67 unit tests** (`npm run test:engine`).
> 
> The exact visual design has been uploaded to [`design/page1.pdf`](file:///d:/Projects/HackGrid/design/page1.pdf) (Landing Page) and [`design/page2.pdf`](file:///d:/Projects/HackGrid/design/page2.pdf) (Command Center Dashboard).

---

## 🎨 1. Design System Rules (Strict)

- **Theme**: 100% Light Mode. Daylight-readable agricultural software.
- **Background**: `#F8FAFC` (Slate 50 canvas) and `#FFFFFF` (Pure white cards).
- **Borders**: 1px solid `#E2E8F0` (Slate 200).
- **Primary Accent**: `#16A34A` (Tailwind `agri-600` / Emerald Green).
- **Primary Hover**: `#15803D` (Tailwind `agri-700`).
- **Accent Tint**: `#DCFCE7` (Tailwind `agri-100`).
- **Danger Alert**: `#DC2626` (Tailwind `alert-600` / Crimson) with `#FEE2E2` tint.
- **Zero Gradients & Zero Neon**: Keep all card backgrounds flat and solid.

---

## 📁 2. Ready-to-Use Backend Functions & Components

All functions are exported from `@/lib` and `@/types/sentinel`:

```typescript
// 1. Types
import { 
  WorkOrderTicket, 
  PathogenId, 
  PipelineStageInfo, 
  DiagnosticResult, 
  WeatherTelemetry 
} from "@/types/sentinel";

// 2. Curated Sample Datasets & Mock Ticket
import { 
  SAMPLE_DIAGNOSTICS, 
  MOCK_WORK_ORDER,
  POTATO_LATE_BLIGHT_SVG,
  TOMATO_EARLY_BLIGHT_SVG,
  CORN_RUST_SVG,
  HEALTHY_LEAF_SVG
} from "@/lib";

// 3. Autonomous 5-Stage Execution Engine
import { executeAutonomousWorkflow, INITIAL_PIPELINE_STAGES } from "@/lib";

// 4. Live Weather & Wallin Index
import { getLiveWeather } from "@/lib";

// 5. EPA Chemical Prescription Engine
import { calculatePrescription, calculateROIEstimate } from "@/lib";

// 6. Camera & Mobile Bridge Component
import { CameraCapture } from "@/components/CameraCapture";
```

---

## 🖥️ 3. The Two Pages to Implement

### Page 1: Landing Page (`app/page.tsx`)
Reference: [`design/page1.pdf`](file:///d:/Projects/HackGrid/design/page1.pdf)
- **Top Badge**: `⚡ 5-STAGE AUTONOMOUS AGENT WORKFLOW • 500–5,000 ACRES`
- **Headline**: "Autonomous Visual Crop Defense for Commercial Farms."
- **Sub-headline**: "Sub-2-second computer vision pathology detection, live weather spore modeling, and automated EPA spray work orders with zero human clicks."
- **CTAs**: 
  - Primary: `<Link href="/dashboard">Launch Sentinel Dashboard</Link>` (solid `#16A34A`)
  - Secondary: `[ View Agronomy Specs ]`
- **Hero Preview Card**: Interactive visual preview showing leaf bounding box and telemetry.
- **Metrics Bar**:
  - `1,200 ac/hr` (Analysis Throughput)
  - `42.8% Average` (Input Reduction)
  - `0.8 mm/px` (Pathogen Resolution)
  - `ISOBUS 11783` (Fleet Compatibility)
- **3-Card Feature Grid**:
  1. Sub-Millimeter Computer Vision (<1.4s inference)
  2. Zero-Click Autonomous Workflow (0 operator clicks)
  3. 10x Input ROI ($34,200/season net savings)
- **Technical Protocol Table**: 5 stages with input sources, algorithmic engines, and SLAs.
- **Pricing Card**: Commercial Grower Standard ($499/month, billed annually).

---

### Page 2: Farm Command Center (`app/dashboard/page.tsx`)
Reference: [`design/page2.pdf`](file:///d:/Projects/HackGrid/design/page2.pdf)

#### 1. Header & Telemetry Bar:
- Left: `CropEye CAB V4.2` with green leaf icon, `Oak Ridge Commercial Farm • 1,850 Total Acres`.
- Right: `Active Sector: 4B (140 Acres Russet Potatoes)`.
- Weather Badge: Live temp, humidity, wind, and spore status:
  `19.4°C | 88% Humidity | Wind: 6.2 mph NW [ SEVERE SPORE VELOCITY ] [ ● AGENT ACTIVE ]`

#### 2. Five-Stage Autonomous Progress Strip:
- Horizontal 5-step track with checkmarks:
  - Step 1: Drone Ingestion ✓ (Tile #4410 • Orthomosaic Sync)
  - Step 2: CV Pathology ✓ (Late Blight Confirmed 96.4%)
  - Step 3: Weather Risk ✓ (72h Spore Velocity High)
  - Step 4: EPA Formulation ✓ (Chlorothalonil 720 SC @ 1.5 pt/ac)
  - Step 5: Tractor Dispatch ✓ (Work-Order #WO-0941 Compiled)
- Right tag: `[ AUTONOMOUS CYCLE COMPLETED (2.4S) ]`
- Trigger button to re-run the autonomous cycle anytime!

#### 3. Left Column: Computer Vision Leaf Inspector
- Tabs: `[ Curated Samples ]` `[ Upload Field Image ]` `[ Live Drone Stream ]`
- Leaf Canvas/Container with bounding boxes:
  - Red box over lesion: `Phytophthora infestans (Late Blight) • 96.4%`
  - Secondary box: `Secondary Necrosis • 18.5% Area`
  - Sub-bar: `SENSOR: MULTISPECTRAL-CAM #04 | RESOL: 4096x2160 • NDVI: 0.28 (STRESSED)`
- Sample Buttons:
  - `Potato Late Blight (Selected)`
  - `Tomato Early Blight`
  - `Corn Common Rust`
  - `Healthy Control`
- Diagnostic Stats:
  - Pathogen: `Potato Late Blight (Phytophthora infestans)`
  - Biosafety Threat: `[ CRITICAL TIER 3 ] Spread Index: 8.8/10`
  - Canopy Degradation: `18.5% Affected Surface Area`

#### 4. Right Column: Prescriptions, Dispatch & ROI
- **Card A: Deterministic EPA Tank-Mix (`AUTO-CALC`)**:
  - `Chlorothalonil 720 SC` (`EPA Reg. #50534-188`)
  - Application Rate: `1.5 pt / acre in 20.0 gal water`
  - Target Solution: `2,800 Gallons Total Solution`
  - Concentrate Needed: `26.2 Gallons ($2,140 input cost)`
  - Wind check: `✓ Wind: 6.2 mph (<10 mph threshold). Buffer: 100ft verified.`
- **Card B: Tractor Work-Order Dispatch (`STATION DISPATCHED`)**:
  - `Ticket: #WO-2026-0941` | `Target: Sector 4B (140 Acres)`
  - `ASSIGNED UNIT: John Deere R4045 #02` | `BOOM WIDTH: 120 ft`
  - `OPERATOR: Telemetry Autonav #12` | `NOZZLE PSI: 42 PSI`
  - Buttons: `[ Export Work-Order PDF ]` (prints or downloads) and `[ Dispatch to Tractor ]`
- **Card C: Financial & Environmental ROI (`REAL-TIME VALUATION`)**:
  - `PROTECTED YIELD: $32,400`
  - `MICRO-TARGETING: 34% Saved vs Blanket Broadcast Spray`
  - Footers: `CARBON OFFSET: 142 kg CO2e` | `GROUNDWATER BUFFER: COMPLIANT`

---

## ⚡ 4. How to Trigger the Autonomous Engine in React

```typescript
// Inside app/dashboard/page.tsx
const [ticket, setTicket] = useState<WorkOrderTicket>(MOCK_WORK_ORDER);
const [stages, setStages] = useState<PipelineStageInfo[]>(INITIAL_PIPELINE_STAGES);
const [isRunning, setIsRunning] = useState<boolean>(false);

const runAutonomousScan = async (sampleId: PathogenId) => {
  setIsRunning(true);
  
  const response = await executeAutonomousWorkflow({
    request: {
      sampleId,
      sectorId: "Sector 4B - North Quadrant",
      acreage: 140,
    },
    stepDelayMs: 400, // 400ms visual delay per step so the user sees the stages animate
    onStageUpdate: (updatedStage) => {
      setStages((prev) => 
        prev.map((s) => s.stage === updatedStage.stage ? updatedStage : s)
      );
    }
  });

  setTicket(response.ticket);
  setIsRunning(false);
};
```

---

## 🚫 5. Things to STRICTLY AVOID (Judging Traps)

1. ❌ **NO AI Chatbots or Prompt Input Bars**: Calling an LLM text API violates our **Computer Vision** won rights!
2. ❌ **NO Dark Mode or Neon Glows**: Strict Light Mode per [`design/page1.pdf`](file:///d:/Projects/HackGrid/design/page1.pdf) and [`design/page2.pdf`](file:///d:/Projects/HackGrid/design/page2.pdf).
3. ❌ **NO Backyard Garden Copy**: Copy must be tailored to **Commercial Family Farms (500–5,000 acres, $499/mo)**.
