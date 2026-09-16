# CropScan AI Sentinel: Design System & Master Figma AI Prompt

This document provides the **exact design specifications, color tokens, and a copy-pasteable Figma AI prompt** to stop AI design tools from generating bloat, random charts, and neon dark modes.

---

## 🎨 1. The Design Rules & Strict Color Tokens

### Core Design Rules
- **Mode**: **Light Mode ONLY** (Clean, crisp, daylight-readable agricultural utility software).
- **Fills**: **100% Solid Fills**. **STRICTLY ZERO GRADIENTS.**
- **Effects**: **STRICTLY ZERO NEON GLOWS, ZERO DROP SHADOWS, ZERO BLURS.**
- **Borders**: Crisp **1px solid border** (`#E2E8F0`) with standard border radius (`8px` or `12px`).
- **Typography**: Clean sans-serif (Inter or System Sans).

---

### The Perfect Color Palette (Exact Hex Codes)

| Role | Color Name | Hex Code | Usage |
|---|---|:---:|---|
| **Canvas Background** | Ultra-Light Slate | **`#F8FAFC`** | Main screen background behind all cards. |
| **Card / Surface Fill**| Pure White | **`#FFFFFF`** | All dashboard cards, modals, and container panels. |
| **Borders & Dividers** | Muted Slate Border | **`#E2E8F0`** | Clean 1px solid card borders. |
| **Primary Accent** | **Agri Emerald Green** | **`#16A34A`** | **THE ONLY ACCENT COLOR.** Primary buttons, active tabs, checkmarks. |
| **Primary Accent Hover**| Forest Green | **`#15803D`** | Hover state on buttons. |
| **Light Accent Tint** | Soft Mint Solid | **`#DCFCE7`** | Background fill for active pills, badges, and healthy tags. |
| **Primary Text** | Deep Slate | **`#0F172A`** | Main titles, table headers, high-contrast metrics. |
| **Secondary Text** | Medium Slate | **`#475569`** | Subtitles, labels, secondary metadata. |
| **Alert / Blight Red** | Solid Crimson | **`#DC2626`** | Bounding box on disease, critical severity badges. |
| **Alert Red Tint** | Soft Rose Solid | **`#FEE2E2`** | Background fill for critical alert badges. |

---

## 🤖 2. The Master Copy-Paste Prompt for Figma AI (or Relume / v0 / Galileo)

Copy and paste this entire prompt block into your Figma AI generator:

```markdown
Generate a clean, professional, enterprise B2B SaaS desktop UI for "CropScan AI Sentinel", an autonomous computer-vision agricultural defense platform for commercial family farms.

STYLE & THEME GUIDELINES (STRICT):
- THEME: 100% Light Mode. Crisp, utilitarian, professional enterprise software (similar to Linear or Stripe Dashboard in light mode).
- BACKGROUND: Pure white (#FFFFFF) cards on light slate background (#F8FAFC) with 1px solid borders (#E2E8F0).
- NO GRADIENTS: Use strictly flat, solid color fills. Zero mesh gradients, zero linear gradients.
- NO NEON GLOWS: Zero neon glows, zero glassmorphism blurs, zero heavy dropshadows.
- SINGLE ACCENT COLOR: Professional Agri Emerald Green (#16A34A) with soft mint solid badge backgrounds (#DCFCE7).
- DANGER ALERT COLOR: Solid crimson (#DC2626) with soft rose background (#FEE2E2) for disease tags.
- TYPOGRAPHY: Clean, high-legibility sans-serif with strong hierarchy.

SCREENS TO DESIGN (ONLY DESIGN THESE TWO SCREENS):

==================================================
SCREEN 1: THE FARM COMMAND CENTER DASHBOARD (/dashboard)
==================================================
Design a widescreen desktop dashboard composed of the following clean cards:

1. TOP TELEMETRY HEADER:
   - Left: Logo "CropScan AI Sentinel" with a simple green leaf badge.
   - Middle: Farm context: "Oak Ridge Commercial Farm" | "1,850 Total Acres" | "Sector 4B (140 Acres Potatoes)".
   - Right: Live microclimate badge: "19.4°C | 88% Humidity | Wind: 6.2 mph" with a solid amber risk pill: "[ SEVERE SPORE VELOCITY ]".

2. FIVE-STAGE AUTONOMOUS WORKFLOW PROGRESS BAR (Horizontal strip across the top):
   - 5 simple step indicators connected by a thin line:
     Step 1: "Ingestion ✓" (Completed green)
     Step 2: "CV Pathology ✓" (Completed green)
     Step 3: "Weather Correlation ✓" (Completed green)
     Step 4: "EPA Prescription ✓" (Completed green)
     Step 5: "Tractor Dispatch ✓" (Completed green)
   - Status tag: Solid green pill "[ AUTONOMOUS CYCLE COMPLETED (2.4s) ]".

3. MAIN TWO-COLUMN WORKSPACE:
   - LEFT COLUMN (Visual Inspection Area):
     - Segmented button: [ Curated Samples ] [ Upload Image ] [ Live Camera ].
     - Large image container showing a close-up photo of a diseased potato leaf.
     - Over the leaf, draw two flat solid red bounding boxes (#DC2626) with crisp white text tags: "Late Blight: 96.4%" and "Necrosis: 18.5%".
     - Diagnostic summary below image: 
       - Pathogen: "Potato Late Blight (Phytophthora infestans)"
       - Severity: Solid red badge "[ CRITICAL TIER 3 ]"
       - Leaf Area Affected: "18.5% Necrosis"

   - RIGHT COLUMN (Prescriptive Defense & Work Order):
     - Card A: "Deterministic EPA Tank-Mix Formulation":
       - Chemical Name: "Chlorothalonil 720 SC" (Badge: "EPA Reg. #50534-188")
       - Dosage: "1.5 pt / acre in 20 gal water"
       - Spray Buffer: Solid green checkmark "Wind: 6.2 mph (<10 mph limit). Safe to apply."
       - Total Chemical Needed: "26.2 Gallons ($2,140 total input cost)"
     - Card B: "Tractor Work-Order Dispatch Ticket":
       - Ticket ID: "#WO-2026-0941" | Target: "Sector 4B"
       - Action buttons: Solid green button "[ 🖨️ Export Work-Order PDF ]" and outline button "[ 📡 Dispatch to Tractor ]".
     - Card C: "Financial ROI Metrics":
       - Metric 1: "$32,400 Crop Value Protected" (Large bold text).
       - Metric 2: "34% Chemical Cost Saved" (Targeted micro-spray vs blanket spray).

==================================================
SCREEN 2: B2B SAAS LANDING PAGE (/)
==================================================
Clean, minimal SaaS landing page:
1. Navbar: Logo, Navigation links (Dashboard, Business Model, Pricing), and a solid green button "[ Open Command Center ]".
2. Hero Section:
   - Headline: "Autonomous Visual Crop Defense for Commercial Farms."
   - Subtitle: "Sub-2-second computer vision pathology detection, live weather spore modeling, and automated EPA spray work orders with zero human clicks."
   - Two CTA buttons: Solid green "[ Launch Sentinel Dashboard ]" and Outline "[ View Judging Proposal ]".
3. Three Clean Feature Cards:
   - Card 1: "Sub-Millimeter Computer Vision" (Instant leaf pathology segmentation).
   - Card 2: "Zero-Click Autonomous Workflow" (End-to-end background execution).
   - Card 3: "10x Input ROI" (Saves $30k+ in chemical waste for commercial farms).
4. Pricing Card:
   - "Commercial Grower Standard" - $499 / month (Up to 2,500 acres, unlimited scans, EPA prescription engine).

==================================================
STRICT NEGATIVE PROMPT - DO NOT INCLUDE ANY OF THESE:
==================================================
- DO NOT generate a dark mode or black/neon screens.
- DO NOT generate complex user profile settings, avatars, or account management pages.
- DO NOT generate a chat box, AI chatbot dialog, or prompt input field.
- DO NOT generate fake analytics line charts with 20 confusing lines.
- DO NOT generate e-commerce shopping carts or checkout flows.
- DO NOT generate IoT hardware sensor configuration wizards or bluetooth pairing screens.
- DO NOT generate home gardening, potted plant, or hobbyist balcony graphics.
```

---

## 🚫 3. Summary of What to Keep vs. What to Delete in Figma

If your AI generator still adds random elements, tell your designers to **delete these immediately**:

| Element | Keep or Delete? | Reason |
|---|:---:|---|
| **AI Chatbot / Text input bar** | ❌ **DELETE** | We won Computer Vision, NOT Generative AI text. Chatbots violate auction constraints! |
| **Complex Multi-line Stock Charts** | ❌ **DELETE** | Farmers need simple numbers: `$32,400 saved`, `18.5% necrosis`, not Wall Street graphs. |
| **Login / Sign Up / Forgot Password** | ❌ **DELETE** | Hackathon demo does not need user auth friction. |
| **IoT Sensor / Bluetooth Pairing** | ❌ **DELETE** | Hardware is out of hackathon scope. |
| **Gradients & Glows** | ❌ **DELETE** | Replace with solid `#16A34A` and flat `#FFFFFF` cards with `#E2E8F0` borders. |
| **5-Stage Workflow Progress Strip** | ✅ **MUST KEEP** | Proves our won **Autonomous Workflow** capability to judges. |
| **Leaf Image with Bounding Boxes** | ✅ **MUST KEEP** | Proves our won **Computer Vision** rights to judges. |
| **EPA Prescription & Work-Order** | ✅ **MUST KEEP** | Proves real-world agronomic and SaaS value. |
| **ROI Counter ($32.4k crop saved)** | ✅ **MUST KEEP** | Proves the **$499/mo B2B SaaS business model**. |
