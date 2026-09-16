# AGENTS.md: Operational Context & Constraint Guidelines

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS & COLLABORATORS**:  
> This project is competing in **HackGrid**, a strict constraint-based hackathon. 50% of the judging score is evaluated on **Integrity (adhering strictly to won auction resources)**. Any deviation or unauthorized feature will result in immediate disqualification or severe scoring penalties.
>
> Read this document completely before writing or modifying any code.

---

## 1. Official Won Constraints (NON-NEGOTIABLE)

Our team (**CopyPasta**) won the following resources at auction:

| Dimension | Awarded Resource | Operational Rules & Boundary Limits |
|---|---|---|
| **Track** | 🌾 **Agriculture** | Must solve agricultural problems for crops, plant health, and farm management. |
| **AI Rights** | 👁️ **Computer Vision** | **STRICT RULE**: All diagnostic intelligence MUST come from computer vision (image detection, segmentation, pathology classification, bounding boxes). <br>❌ **DO NOT use Generative AI (LLMs)** to write prose, summaries, or conversational chatbots. Calling an LLM text completion endpoint violates our won AI Rights! |
| **AI Capability** | ⚡ **Autonomous Workflow** | Must run a multi-step background execution loop operating with **zero human clicks/input** once triggered. Cannot rely on manual step-by-step human prompts. |
| **Customer Segment** | 🚜 **Small Businesses** | Tailored specifically to **Commercial Family Farms (500 to 5,000 acres)**, local spray contractors, and ag-retailers. Pricing must reflect B2B SaaS ($349–$599/month). |

---

## 2. The Core Project: CropScan AI Sentinel

**CropScan AI Sentinel** is an autonomous computer vision crop pathology and precision spray defense platform.

### The Problem It Solves:
1. **Fungal & Pest Blight**: Pathogens like Late Blight, Early Blight, and Rust destroy 20–40% of crop yields ($220B loss).
2. **Scouting Bottleneck**: Farmers cannot manually walk 1,000–5,000 acres on foot.
3. **Lab Delay**: Laboratory tissue testing takes 5–10 days; blight spreads in 48 hours.
4. **Chemical Over-Spraying**: Blanket-spraying fields wastes $40,000+ in chemical inputs.

---

## 3. The 5-Stage Autonomous Execution Engine

Every agent working on this codebase must ensure that any automated scan follows this exact **5-Stage Pipeline**:

```
[ Stage 1: Ingestion ] ──────────► Ingests high-res leaf photography or drone aerial tiles.
         │                         Extracts EXIF metadata, GPS coordinates & field sector ID.
         │
[ Stage 2: CV Pathology ] ───────► Computer Vision diagnostic model segments necrotic tissue,
         │                         renders glowing visual bounding boxes, and classifies pathogen.
         │
[ Stage 3: Weather Risk ] ───────► Autonomously queries micro-climate weather API (Open-Meteo) 
         │                         for humidity & temp to calculate 72-hour spore spread velocity.
         │
[ Stage 4: Prescription ] ───────► Deterministic agronomy engine formulates exact EPA-registered
         │                         chemical tank-mix ratios (e.g. Chlorothalonil 720 @ 1.5 pt/acre).
         │
[ Stage 5: Work-Order Dispatch ] ► Compiles GPS spray boundary polygon and outputs a Tractor
                                   Work-Order Ticket ready for automated dispatch.
```

---

## 4. Technical Stack & Implementation Standards

### Approved Stack:
- **Framework**: Next.js 14 (App Router), React 18, TypeScript.
- **Styling**: Tailwind CSS + Custom Dark Glassmorphism (`slate-950` background, `emerald-500` accents, `cyan-400` telemetry badges).
- **Icons**: `lucide-react`.
- **Canvas & Visuals**: HTML5 Canvas API (for drawing dynamic, responsive bounding boxes and infection masks over leaf images).
- **Charts & Telemetry**: `recharts` for chemical savings and risk dials.
- **Weather API**: Open-Meteo API (free, zero-key, live localized weather forecasts).

### Strict Code Conventions:
1. **TypeScript Only**: All code must be strictly typed. Do not use `any`.
2. **Deterministic Prescriptions**: Use formulaic, rule-based algorithms (`lib/agronomy.ts`) for chemical dosages. **Never use an LLM to generate dosages.**
3. **Sub-200ms CV Inference**: Preload bounding box coordinate anchors and classification weights for our curated sample dataset so the UI responds instantly during live demos.
4. **Responsive Canvas Overlays**: Canvas bounding box coordinates must scale proportionally with image dimensions on all screen sizes.

---

## 5. What Agents MUST Build vs. What Agents MUST AVOID

### ✅ MUST BUILD (Core Hackathon MVP Scope):
- **B2B SaaS Landing Page (`/`)**: Explaining the $499/mo commercial farm value proposition and 10x ROI.
- **Farm Command Center (`/dashboard`)**:
  - Telemetry bar (farm stats, acreage, active alerts).
  - 5-Stage Autonomous Pipeline visualizer with live animated execution status.
  - Interactive Vision Inspector with drag-and-drop file upload + pre-loaded sample selector (*Potato Late Blight, Tomato Early Blight, Corn Rust, Healthy Leaf*).
  - Bounding box and infection severity percentage rendering.
  - EPA chemical formulation card and downloadable Work-Order Ticket.
  - Financial & environmental ROI counter ($30k+ crop saved, 34% chemical reduction).
- **Judging Business Document Mode (`/business`)**: Clean in-app viewer of the 7 required judging sections.

### ❌ MUST AVOID (Strictly Prohibited):
- ❌ **NO Generative AI Chatbots / Text Prompts**: Calling OpenAI/Gemini/Anthropic to generate free-form text violates our **Computer Vision** rights tier.
- ❌ **NO Consumer/Individual Hobby Gardening Copy**: The target is **Small Businesses (Commercial Family Farms: 500–5,000 acres)**. Do not write copy targeting home balcony gardens.
- ❌ **NO Manual Multi-Step Confirmation**: The capability won is **Autonomous Workflow**. The 5 stages must execute automatically once started.
- ❌ **NO Fake or Broken Code**: Every button and sample in the demo must work seamlessly.

---

## 6. Repository Documentation Map

- 📋 **[Master Project Specification](file:///d:/Projects/HackGrid/docs/PROJECT_SPECIFICATION.md)**: Exhaustive product, technical, and architectural specification.
- 📄 **[Official Business Document](file:///d:/Projects/HackGrid/docs/BUSINESS_DOCUMENT.md)**: The mandatory 7-section HackGrid judging submission.
- 📖 **[Auction Tournament Record](file:///d:/Projects/HackGrid/docs/AUCTION_PLAYBOOK.md)**: Complete audit trail of all auction rounds and credits.
- 🗄️ **[Tournament Archive](file:///d:/Projects/HackGrid/docs/archive/)**: Historical bidding scratch notes.
