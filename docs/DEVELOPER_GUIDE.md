# CropScan AI Sentinel: Developer & Team Onboarding Guide

A quickstart and architecture handbook for human developers and agents building **CropScan AI Sentinel**.

---

## 1. Project Directory Structure

```
HackGrid/
├── AGENTS.md                              # CRITICAL: Strict AI agent rules & constraint limits
├── README.md                              # Project overview, constraints badge & quickstart
├── docs/
│   ├── PROJECT_SPECIFICATION.md           # Exhaustive product & technical blueprint
│   ├── BUSINESS_DOCUMENT.md               # Official HackGrid 7-section judging deliverable
│   ├── AUCTION_PLAYBOOK.md                # Tournament history & credit accounting
│   ├── DEVELOPER_GUIDE.md                 # This file: codebase architecture & workflow
│   └── archive/                           # Historical auction bidding scratch notes
├── apps/
│   └── web/                               # Next.js 14 full-stack application
│       ├── app/
│       │   ├── page.tsx                   # B2B SaaS Landing Page
│       │   ├── dashboard/                 # The Farm Command Center (Main App)
│       │   ├── business/                  # In-app judging business document & pitch
│       │   └── api/                       # API endpoints (workflow, cv, weather)
│       ├── components/                    # Reusable UI widgets & visualizers
│       │   ├── Navbar.tsx                 # Header navigation & live auction constraint tags
│       │   ├── TelemetryBar.tsx           # Farm acreage & active alert metrics
│       │   ├── AutonomousPipeline.tsx     # 5-stage animated execution progress bar
│       │   ├── VisionInspector.tsx        # HTML5 Canvas bounding box viewer
│       │   ├── PrescriptionCard.tsx       # EPA tank-mix recipe & safety buffer
│       │   ├── ROICounter.tsx             # Live financial ROI counter ($30k+ crop saved)
│       │   └── SampleSelector.tsx         # Preloaded high-res leaf pathology selector
│       ├── lib/
│       │   ├── cv-engine.ts               # Computer vision pathology detection logic
│       │   ├── agronomy.ts                # Deterministic EPA chemical dosage formulas
│       │   └── sample-data.ts             # Curated high-res images & bounding box coordinates
│       └── styles/
│           └── globals.css                # Dark glassmorphic design tokens
└── tools/
    └── auction_calculator.py              # Tournament bidding advisor script
```

---

## 2. Core Operational Modules & Their Responsibilities

### Module A: Computer Vision Engine (`lib/cv-engine.ts`)
- **Responsibility**: Ingests image data (either preloaded pathology sample or custom user upload), runs visual detection, and outputs:
  - `pathogenClass`: *Late Blight*, *Early Blight*, *Common Rust*, *Powdery Mildew*, or *Healthy*.
  - `confidenceScore`: e.g. `96.4%`.
  - `affectedAreaPercentage`: e.g. `18.5%`.
  - `boundingBoxes`: Array of normalized coordinates `[ymin, xmin, ymax, xmax]`.
- **Constraint Note**: Must be deterministic or vision-model driven. **Do not call an LLM.**

### Module B: The 5-Stage Autonomous Pipeline (`components/AutonomousPipeline.tsx`)
- **Responsibility**: Animates and tracks the complete multi-step autonomous loop:
  1. **Ingestion**: Ingests image, parses EXIF metadata & GPS coordinates.
  2. **CV Pathology**: Detects lesions, classifies pathogen, computes severity.
  3. **Weather Risk**: Queries Open-Meteo API for real-time relative humidity & temperature to evaluate 72-hour spore spread risk.
  4. **Prescription**: Formulates EPA tank-mix chemical recipes and safety buffer zones.
  5. **Dispatch**: Generates GPS polygon coordinates and creates a digital Work-Order Ticket.

### Module C: Deterministic Agronomy Engine (`lib/agronomy.ts`)
- **Responsibility**: Maps detected disease + acreage + weather metrics into an exact EPA-registered chemical formulation:
  - Active Ingredients (e.g. Chlorothalonil 720, Mancozeb, Azoxystrobin).
  - Tank-Mix ratio (e.g. 1.5 pints / acre in 20 gallons of water).
  - Buffer zones (no spray if wind > 10 mph or within 100 ft of waterways).

### Module D: Interactive Vision Canvas (`components/VisionInspector.tsx`)
- **Responsibility**: Renders the leaf photo on an HTML5 canvas and draws responsive glowing bounding boxes (`#10b981` emerald or `#ef4444` red) around infected spots.

---

## 3. Getting Started Locally

### Prerequisites:
- Node.js 18+ or 20+
- npm or pnpm

### Quick Setup:
```bash
# 1. Navigate to the web application
cd apps/web

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

---

## 4. Constraint Integrity Checklist (For Pre-Commit Verification)

Before committing any feature or presenting to judges, verify:
- [ ] **Track**: Is all terminology, imagery, and data strictly agricultural?
- [ ] **AI Rights**: Is ALL intelligence derived from Computer Vision and deterministic math? Are there **ZERO calls to LLM / Generative AI text completion APIs**?
- [ ] **AI Capability**: Does the pipeline execute autonomously without forcing human step-by-step confirmation?
- [ ] **Customer Segment**: Is all copy, pricing ($349–$599/mo), and imagery tailored to **Commercial Family Farms (500–5,000 acres)**?

---

## 5. ⏱️ The 20-Hour Hackathon Milestone Schedule (Deadline: 4:00 PM Tomorrow)

| Timeframe | Phase | Milestones & Goals |
|---|---|---|
| **Hours 1 – 3** | **Phase 1: Scaffolding & Design** | Initialize Next.js 14, Tailwind dark glassmorphism, types, and curated leaf sample data. |
| **Hours 4 – 8** | **Phase 2: Vision & Agronomy** | Build Canvas CV engine (bounding boxes, necrosis %), Open-Meteo weather API, EPA tank-mix logic. |
| **Hours 9 – 14** | **Phase 3: Autonomous Sentinel** | Connect 5-stage automated execution pipeline, Farm Command Center (`/dashboard`), and work-order export. |
| **Hours 15 – 18** | **Phase 4: Landing & Pitch View** | Build B2B SaaS landing page (`/`), in-app judging document viewer (`/business`), and financial ROI counters. |
| **Hours 19 – 20** | **Phase 5: Polish & Deployment** | Multi-browser testing, edge-case validation, 1-click Vercel deployment, and pitch rehearsal. |

---

## 6. 🤖 Teammate Agent Alignment & Orientation Prompt

When your teammates start a new chat with an AI assistant (Cursor, Antigravity, Claude Dev, Copilot, etc.), have them **paste this prompt first**. 

This forces the agent to read all documentation, absorb the non-negotiable hackathon constraints, and confirm its understanding **before touching any code or making assumptions**:

```markdown
Please thoroughly read and internalize the following documentation in this repository before answering any questions or writing code:
1. `AGENTS.md` (Mandatory operational rules & constraint boundaries)
2. `docs/PROJECT_SPECIFICATION.md` (Master architectural blueprint & product concept)
3. `docs/BUSINESS_DOCUMENT.md` (Official HackGrid 7-section submission)

CORE CONTEXT & RULES:
Our team (CopyPasta) is competing in HackGrid, a strict constraint-based hackathon. 50% of our judging score is evaluated on Integrity (strict adherence to our won auction resources):
- Track: 🌾 Agriculture
- AI Rights: 👁️ Computer Vision ONLY (All diagnostic intelligence must come from visual inspection, image segmentation, and bounding boxes. Strictly NO Generative AI text generation / LLMs).
- AI Capability: ⚡ Autonomous Workflow (A 5-stage automated pipeline that executes with zero human clicks once triggered).
- Customer Segment: 🚜 Small Businesses (Commercial Family Farms: 500–5,000 acres, $349–$599/mo B2B SaaS. Never target hobby gardeners).

Please read the documents and confirm your understanding by providing a concise summary of:
1. The core product ("CropScan AI Sentinel") and the specific problem it solves for commercial farms.
2. The 5-Stage Autonomous Execution Pipeline.
3. What is strictly forbidden under our won constraints.

Do not write or modify any code yet. Just confirm your alignment with the project constraints and architecture.
```
