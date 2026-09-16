import { DiagnosticResult, PathogenId, WorkOrderTicket } from "@/types/sentinel";

// ============================================================================
// Curated High-Definition Agricultural Leaf Sample Visuals (Offline Safe)
// Rendered via deterministic high-fidelity SVG graphics to guarantee 100%
// offline reliability without external image host dependencies.
// ============================================================================

export const POTATO_LATE_BLIGHT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#f1f5f9"/>
  <!-- Leaf Stem & Background shadow -->
  <path d="M 400 580 Q 395 480 390 380" stroke="#334155" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Main Potato Leaf Silhouette -->
  <path d="M 400 40 C 580 80 720 220 680 420 C 640 500 520 540 400 550 C 280 540 160 500 120 420 C 80 220 220 80 400 40 Z" fill="#2d6a4f"/>
  <!-- Leaf Lobes and Texture -->
  <path d="M 400 70 C 530 110 650 220 620 380 C 590 450 490 500 400 510 C 310 500 210 450 180 380 C 150 220 270 110 400 70 Z" fill="#3a7d44"/>
  <!-- Primary and Secondary Veins -->
  <path d="M 400 60 L 400 530" stroke="#74c69d" stroke-width="4" stroke-linecap="round"/>
  <path d="M 400 180 Q 480 150 560 170" stroke="#52b788" stroke-width="2.5" fill="none"/>
  <path d="M 400 240 Q 320 210 240 230" stroke="#52b788" stroke-width="2.5" fill="none"/>
  <path d="M 400 300 Q 500 270 580 310" stroke="#52b788" stroke-width="2.5" fill="none"/>
  <path d="M 400 360 Q 300 340 220 370" stroke="#52b788" stroke-width="2.5" fill="none"/>
  <path d="M 400 430 Q 480 410 540 450" stroke="#52b788" stroke-width="2" fill="none"/>

  <!-- Pathogen: Phytophthora infestans (Late Blight) Primary Lesion -->
  <!-- Pale Chlorotic Halo -->
  <path d="M 280 180 C 360 150 520 170 540 280 C 550 360 480 380 380 370 C 280 360 230 300 240 240 C 250 200 260 190 280 180 Z" fill="#d4a373" opacity="0.6"/>
  <!-- Water-soaked Dark Brown Necrosis -->
  <path d="M 300 200 C 360 180 480 190 500 270 C 510 320 450 350 380 340 C 300 330 260 290 270 240 Z" fill="#3d2617"/>
  <!-- Deep Black Collapsed Core -->
  <path d="M 340 220 C 390 210 460 220 470 270 C 480 300 420 330 370 320 C 320 310 310 270 340 220 Z" fill="#1b120c"/>
  <!-- Secondary Sporulation Edge -->
  <circle cx="490" cy="280" r="18" fill="#58311b" opacity="0.85"/>
  <circle cx="330" cy="310" r="14" fill="#422513" opacity="0.9"/>
  <!-- White Mildew Sporulation Margin (Microscopic fungus bloom) -->
  <path d="M 480 290 Q 520 320 470 350" stroke="#f1f5f9" stroke-width="3" stroke-dasharray="3,3" fill="none"/>

  <!-- Secondary Lower Lesion -->
  <ellipse cx="500" cy="420" rx="60" ry="40" fill="#b08968" opacity="0.7"/>
  <ellipse cx="505" cy="420" rx="45" ry="30" fill="#382215"/>
  <ellipse cx="510" cy="420" rx="25" ry="18" fill="#1c0f0a"/>
</svg>
`)}`;

export const TOMATO_EARLY_BLIGHT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#f1f5f9"/>
  <!-- Stem -->
  <path d="M 400 580 Q 395 480 395 380" stroke="#334155" stroke-width="7" stroke-linecap="round" fill="none"/>
  <!-- Serrated Tomato Leaf Shape -->
  <path d="M 400 50 C 460 80 540 100 620 180 C 580 200 640 260 670 340 C 610 350 630 420 590 480 C 500 490 440 520 400 540 C 360 520 300 490 210 480 C 170 420 190 350 130 340 C 160 260 220 200 180 180 C 260 100 340 80 400 50 Z" fill="#2d6a4f"/>
  <path d="M 400 80 C 450 110 520 130 580 200 C 550 220 600 270 620 340 C 570 350 580 400 540 450 C 470 460 420 490 400 510 C 380 490 330 460 260 450 C 220 400 230 350 180 340 C 200 270 250 220 220 200 C 280 130 350 110 400 80 Z" fill="#40916c"/>
  
  <!-- Veins -->
  <path d="M 400 70 L 400 520" stroke="#74c69d" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M 400 180 L 530 160" stroke="#52b788" stroke-width="2"/>
  <path d="M 400 240 L 260 220" stroke="#52b788" stroke-width="2"/>
  <path d="M 400 320 L 550 300" stroke="#52b788" stroke-width="2"/>
  <path d="M 400 390 L 250 380" stroke="#52b788" stroke-width="2"/>

  <!-- Alternaria solani Concentric Target Spot #1 -->
  <!-- Yellow chlorotic border ring -->
  <circle cx="380" cy="250" r="85" fill="#fde047" opacity="0.45"/>
  <!-- Outer necrotic ring -->
  <circle cx="380" cy="250" r="68" fill="#92400e"/>
  <!-- Concentric band 1 -->
  <circle cx="380" cy="250" r="54" fill="#78350f"/>
  <!-- Concentric band 2 -->
  <circle cx="380" cy="250" r="40" fill="#b45309"/>
  <!-- Concentric band 3 (Bullseye core) -->
  <circle cx="380" cy="250" r="26" fill="#451a03"/>
  <circle cx="380" cy="250" r="12" fill="#1c0a00"/>

  <!-- Concentric Target Spot #2 (Lower left) -->
  <circle cx="420" cy="400" r="60" fill="#fde047" opacity="0.4"/>
  <circle cx="420" cy="400" r="48" fill="#92400e"/>
  <circle cx="420" cy="400" r="36" fill="#78350f"/>
  <circle cx="420" cy="400" r="22" fill="#451a03"/>
</svg>
`)}`;

export const CORN_RUST_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#f1f5f9"/>
  <!-- Corn Blade (Elongated Ribbon) -->
  <path d="M 220 580 C 240 400 280 200 400 20 C 520 200 560 400 580 580 Z" fill="#2d6a4f"/>
  <path d="M 240 580 C 260 410 300 220 400 60 C 500 220 540 410 560 580 Z" fill="#40916c"/>
  
  <!-- Parallel Monocot Veins -->
  <path d="M 400 30 L 400 580" stroke="#74c69d" stroke-width="4"/>
  <path d="M 370 70 L 330 580" stroke="#52b788" stroke-width="2"/>
  <path d="M 430 70 L 470 580" stroke="#52b788" stroke-width="2"/>
  <path d="M 340 120 L 290 580" stroke="#52b788" stroke-width="1.5"/>
  <path d="M 460 120 L 510 580" stroke="#52b788" stroke-width="1.5"/>

  <!-- Puccinia sorghi (Common Rust) Pustule Clusters (Reddish/Brown Oval Blisters) -->
  <!-- Cluster 1 (Mid upper) -->
  <g fill="#c2410c">
    <ellipse cx="370" cy="180" rx="14" ry="7" transform="rotate(-10 370 180)"/>
    <ellipse cx="430" cy="190" rx="16" ry="8" transform="rotate(15 430 190)"/>
    <ellipse cx="390" cy="215" rx="18" ry="9" fill="#9a3412"/>
    <ellipse cx="415" cy="235" rx="15" ry="7" transform="rotate(-5 415 235)"/>
    <ellipse cx="360" cy="245" rx="12" ry="6"/>
  </g>

  <!-- Cluster 2 (Mid Center Dense Pustules) -->
  <g fill="#ea580c">
    <ellipse cx="380" cy="320" rx="20" ry="10" fill="#7c2d12"/>
    <ellipse cx="420" cy="335" rx="18" ry="9" fill="#9a3412"/>
    <ellipse cx="350" cy="350" rx="15" ry="8"/>
    <ellipse cx="440" cy="365" rx="22" ry="10" fill="#7c2d12"/>
    <ellipse cx="390" cy="380" rx="25" ry="11" fill="#6c1d07"/>
    <ellipse cx="360" cy="405" rx="16" ry="8"/>
    <ellipse cx="410" cy="420" rx="18" ry="9" fill="#9a3412"/>
  </g>

  <!-- Golden urediniospores halo -->
  <ellipse cx="395" cy="360" rx="80" ry="70" fill="#f97316" opacity="0.25"/>
</svg>
`)}`;

export const HEALTHY_LEAF_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#f1f5f9"/>
  <!-- Stem -->
  <path d="M 400 580 Q 395 480 395 380" stroke="#1b4332" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- Vibrant Healthy Foliage -->
  <path d="M 400 40 C 580 90 710 230 670 420 C 630 490 510 530 400 545 C 290 530 170 490 130 420 C 90 230 220 90 400 40 Z" fill="#1b4332"/>
  <path d="M 400 70 C 540 120 640 230 610 380 C 580 440 480 490 400 510 C 320 490 220 440 190 380 C 160 230 260 120 400 70 Z" fill="#2d6a4f"/>
  <path d="M 400 100 C 500 150 580 240 560 360 C 530 410 450 460 400 480 C 350 460 270 410 240 360 C 220 240 300 150 400 100 Z" fill="#40916c"/>

  <!-- Crisp Pristine Venation -->
  <path d="M 400 60 L 400 520" stroke="#74c69d" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M 400 160 Q 480 130 560 150" stroke="#95d5b2" stroke-width="2.5" fill="none"/>
  <path d="M 400 220 Q 320 190 240 210" stroke="#95d5b2" stroke-width="2.5" fill="none"/>
  <path d="M 400 280 Q 500 250 580 290" stroke="#95d5b2" stroke-width="2.5" fill="none"/>
  <path d="M 400 350 Q 300 330 220 360" stroke="#95d5b2" stroke-width="2.5" fill="none"/>
  <path d="M 400 420 Q 480 400 540 440" stroke="#95d5b2" stroke-width="2" fill="none"/>
  <path d="M 400 480 Q 320 460 260 500" stroke="#95d5b2" stroke-width="2" fill="none"/>

  <!-- Clean Leaf Gloss Highlight -->
  <path d="M 380 140 C 350 200 340 300 360 400" stroke="#d8f3dc" stroke-width="4" stroke-linecap="round" opacity="0.3" fill="none"/>
</svg>
`)}`;

// ============================================================================
// Curated Diagnostics Registry
// ============================================================================

export const SAMPLE_DIAGNOSTICS: Record<PathogenId, DiagnosticResult> = {
  potato_late_blight: {
    pathogenId: "potato_late_blight",
    commonName: "Potato Late Blight",
    scientificName: "Phytophthora infestans",
    confidence: 96.4,
    necrosisPercentage: 18.5,
    severityLevel: "CRITICAL",
    imageUrl: POTATO_LATE_BLIGHT_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-plb-1",
        ymin: 24.0,
        xmin: 32.0,
        ymax: 58.0,
        xmax: 68.0,
        label: "Necrotic Lesion (Phytophthora)",
        confidence: 96.4,
      },
      {
        id: "box-plb-2",
        ymin: 62.0,
        xmin: 55.0,
        ymax: 82.0,
        xmax: 80.0,
        label: "Sporulation Margin",
        confidence: 92.1,
      },
    ],
    ragRetrieval: {
      queryVectorDimensions: 32,
      topMatch: {
        specimenId: "USDA-ARS-PLB-0881",
        cropSpecies: "Solanum tuberosum (Russet Burbank)",
        pathogenName: "Phytophthora infestans (Oomycete)",
        commonName: "Potato Late Blight",
        pathogenId: "potato_late_blight",
        similarityScore: 97.8,
        institutionSource: "USDA-ARS / Cornell Agricultural Extension [PLB-881]",
        diagnosticMarkers: [
          "Rapidly advancing dark water-soaked necrotic lesions (>20% surface)",
          "Pale chlorotic halo advancing along leaflet tips and margins",
          "Pinnate compound leaf geometry with ovate lateral leaflets",
          "Sporangia emergence under high humidity (>85% RH)",
        ],
      },
      candidates: [
        {
          specimenId: "USDA-ARS-PLB-0881",
          cropSpecies: "Solanum tuberosum",
          pathogenName: "Phytophthora infestans",
          commonName: "Potato Late Blight",
          pathogenId: "potato_late_blight",
          similarityScore: 97.8,
          institutionSource: "USDA-ARS [PLB-881]",
          diagnosticMarkers: ["Water-soaked dark lesions", "Chlorotic halo margin"],
        },
        {
          specimenId: "USDA-ARS-NCLB-6411",
          cropSpecies: "Zea mays",
          pathogenName: "Exserohilum turcicum",
          commonName: "Northern Corn Leaf Blight",
          pathogenId: "corn_northern_blight",
          similarityScore: 68.4,
          institutionSource: "University of Illinois [NCLB-6411]",
          diagnosticMarkers: ["Cigar-shaped lesions"],
        },
        {
          specimenId: "USDA-ARS-TEB-0422",
          cropSpecies: "Solanum lycopersicum",
          pathogenName: "Alternaria solani",
          commonName: "Tomato Early Blight",
          pathogenId: "tomato_early_blight",
          similarityScore: 42.1,
          institutionSource: "University of Florida [TEB-422]",
          diagnosticMarkers: ["Concentric target rings"],
        },
      ],
      totalAtlasSpecimensIndexed: 14200,
      retrievalLatencyMs: 38,
    },
  },
  tomato_early_blight: {
    pathogenId: "tomato_early_blight",
    commonName: "Tomato Early Blight",
    scientificName: "Alternaria solani",
    confidence: 94.1,
    necrosisPercentage: 12.8,
    severityLevel: "HIGH",
    imageUrl: TOMATO_EARLY_BLIGHT_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-teb-1",
        ymin: 28.0,
        xmin: 33.0,
        ymax: 56.0,
        xmax: 62.0,
        label: "Concentric Target Spot",
        confidence: 94.1,
      },
      {
        id: "box-teb-2",
        ymin: 58.0,
        xmin: 42.0,
        ymax: 78.0,
        xmax: 66.0,
        label: "Secondary Alternaria Lesion",
        confidence: 91.5,
      },
    ],
    ragRetrieval: {
      queryVectorDimensions: 32,
      topMatch: {
        specimenId: "USDA-ARS-TEB-0422",
        cropSpecies: "Solanum lycopersicum (Roma Tomato)",
        pathogenName: "Alternaria solani (Ascomycete)",
        commonName: "Tomato Early Blight",
        pathogenId: "tomato_early_blight",
        similarityScore: 96.4,
        institutionSource: "University of Florida IFAS Plant Pathology [TEB-422]",
        diagnosticMarkers: [
          "Concentric alternating dark and light rings (target-board appearance)",
          "Pronounced brilliant yellow chlorotic halo surrounding lesions",
          "Deeply lobed pinnatifid foliar morphology",
          "Localized circular to oval lesions with distinct boundaries",
        ],
      },
      candidates: [
        {
          specimenId: "USDA-ARS-TEB-0422",
          cropSpecies: "Solanum lycopersicum",
          pathogenName: "Alternaria solani",
          commonName: "Tomato Early Blight",
          pathogenId: "tomato_early_blight",
          similarityScore: 96.4,
          institutionSource: "University of Florida [TEB-422]",
          diagnosticMarkers: ["Concentric rings", "Yellow chlorotic halo"],
        },
        {
          specimenId: "USDA-ARS-AS-1194",
          cropSpecies: "Malus domestica",
          pathogenName: "Venturia inaequalis",
          commonName: "Apple Scab",
          pathogenId: "apple_scab",
          similarityScore: 61.2,
          institutionSource: "Cornell Fruit Pathology [AS-1194]",
          diagnosticMarkers: ["Velvety olive-black lesion", "Serrated margin"],
        },
        {
          specimenId: "USDA-ARS-CAR-0931",
          cropSpecies: "Malus domestica",
          pathogenName: "Gymnosporangium",
          commonName: "Cedar Apple Rust",
          pathogenId: "apple_rust",
          similarityScore: 48.6,
          institutionSource: "Penn State Extension [CAR-0931]",
          diagnosticMarkers: ["Yellow-orange circular spots"],
        },
      ],
      totalAtlasSpecimensIndexed: 14200,
      retrievalLatencyMs: 42,
    },
  },
  corn_rust: {
    pathogenId: "corn_rust",
    commonName: "Corn Common Rust",
    scientificName: "Puccinia sorghi",
    confidence: 92.8,
    necrosisPercentage: 15.2,
    severityLevel: "HIGH",
    imageUrl: CORN_RUST_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-cr-1",
        ymin: 22.0,
        xmin: 35.0,
        ymax: 46.0,
        xmax: 65.0,
        label: "Rust Pustule Streak",
        confidence: 92.8,
      },
      {
        id: "box-cr-2",
        ymin: 50.0,
        xmin: 38.0,
        ymax: 76.0,
        xmax: 68.0,
        label: "Dense Urediniospore Cluster",
        confidence: 89.6,
      },
    ],
    ragRetrieval: {
      queryVectorDimensions: 32,
      topMatch: {
        specimenId: "USDA-ARS-CCR-5104",
        cropSpecies: "Zea mays (Yellow Dent Corn)",
        pathogenName: "Puccinia sorghi (Basidiomycete)",
        commonName: "Corn Common Rust",
        pathogenId: "corn_rust",
        similarityScore: 96.0,
        institutionSource: "Purdue Extension Crop Diseases Laboratory [CCR-5104]",
        diagnosticMarkers: [
          "Elongated brick-red to golden-brown pustules arranged in parallel linear rows",
          "Monocot linear-lanceolate strap blade with parallel venation (Aspect > 2.2)",
          "Prominent midrib with bilateral leaf symmetry",
          "Eruptive powdery urediniospores scattered on upper and lower epidermis",
        ],
      },
      candidates: [
        {
          specimenId: "USDA-ARS-CCR-5104",
          cropSpecies: "Zea mays",
          pathogenName: "Puccinia sorghi",
          commonName: "Corn Common Rust",
          pathogenId: "corn_rust",
          similarityScore: 96.0,
          institutionSource: "Purdue Extension [CCR-5104]",
          diagnosticMarkers: ["Linear rust pustules", "Parallel venation"],
        },
        {
          specimenId: "USDA-ARS-WSR-2890",
          cropSpecies: "Triticum aestivum",
          pathogenName: "Puccinia striiformis",
          commonName: "Wheat Stripe Rust",
          pathogenId: "wheat_rust",
          similarityScore: 78.4,
          institutionSource: "USDA-ARS [WSR-2890]",
          diagnosticMarkers: ["Narrow pustule stripes"],
        },
        {
          specimenId: "USDA-ARS-NCLB-6012",
          cropSpecies: "Zea mays",
          pathogenName: "Exserohilum turcicum",
          commonName: "Northern Corn Leaf Blight",
          pathogenId: "corn_northern_blight",
          similarityScore: 68.5,
          institutionSource: "University of Illinois [NCLB-6012]",
          diagnosticMarkers: ["Cigar-shaped lesions", "Parallel venation"],
        },
      ],
      totalAtlasSpecimensIndexed: 14200,
      retrievalLatencyMs: 35,
    },
  },
  powdery_mildew: {
    pathogenId: "powdery_mildew",
    commonName: "Cucurbit Powdery Mildew",
    scientificName: "Podosphaera xanthii",
    confidence: 90.7,
    necrosisPercentage: 8.4,
    severityLevel: "MODERATE",
    imageUrl: POTATO_LATE_BLIGHT_SVG, // Fallback visual
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-pm-1",
        ymin: 30.0,
        xmin: 30.0,
        ymax: 65.0,
        xmax: 70.0,
        label: "Talcum Powdery Mycelium",
        confidence: 90.7,
      },
    ],
  },
  corn_northern_blight: {
    pathogenId: "corn_northern_blight",
    commonName: "Northern Corn Leaf Blight",
    scientificName: "Exserohilum turcicum",
    confidence: 94.0,
    necrosisPercentage: 16.5,
    severityLevel: "HIGH",
    imageUrl: CORN_RUST_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-nclb-1",
        ymin: 20.0,
        xmin: 25.0,
        ymax: 75.0,
        xmax: 75.0,
        label: "Cigar-shaped Exserohilum Lesion",
        confidence: 94.0,
      },
    ],
  },
  wheat_rust: {
    pathogenId: "wheat_rust",
    commonName: "Wheat Stripe Rust",
    scientificName: "Puccinia striiformis",
    confidence: 93.8,
    necrosisPercentage: 13.5,
    severityLevel: "HIGH",
    imageUrl: CORN_RUST_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-wr-1",
        ymin: 15.0,
        xmin: 35.0,
        ymax: 85.0,
        xmax: 65.0,
        label: "Linear Stripe Rust Uredinia",
        confidence: 93.8,
      },
    ],
  },
  apple_scab: {
    pathogenId: "apple_scab",
    commonName: "Apple Scab",
    scientificName: "Venturia inaequalis (Malus domestica)",
    confidence: 96.8,
    necrosisPercentage: 22.4,
    severityLevel: "HIGH",
    imageUrl: POTATO_LATE_BLIGHT_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-as-1",
        ymin: 22.0,
        xmin: 18.0,
        ymax: 82.0,
        xmax: 52.0,
        label: "Venturia inaequalis Scab: 96.8%",
        confidence: 96.8,
      },
    ],
  },
  apple_rust: {
    pathogenId: "apple_rust",
    commonName: "Cedar Apple Rust",
    scientificName: "Gymnosporangium juniperi-virginianae",
    confidence: 94.6,
    necrosisPercentage: 14.2,
    severityLevel: "HIGH",
    imageUrl: CORN_RUST_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-ar-1",
        ymin: 25.0,
        xmin: 25.0,
        ymax: 75.0,
        xmax: 75.0,
        label: "Gymnosporangium Rust Aecium: 94.6%",
        confidence: 94.6,
      },
    ],
  },
  non_plant_detected: {
    pathogenId: "non_plant_detected",
    commonName: "Non-Crop Image Detected",
    scientificName: "No Foliar Tissue Found (Human / Non-Agricultural Subject)",
    confidence: 0.0,
    necrosisPercentage: 0.0,
    severityLevel: "LOW",
    imageUrl: HEALTHY_LEAF_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-non-plant",
        ymin: 10.0,
        xmin: 10.0,
        ymax: 90.0,
        xmax: 90.0,
        label: "INVALID: Non-Plant Subject (0% Crop Tissue)",
        confidence: 0.0,
      },
    ],
  },
  healthy: {
    pathogenId: "healthy",
    commonName: "Healthy Crop Foliage",
    scientificName: "Solanum tuberosum (Healthy)",
    confidence: 99.2,
    necrosisPercentage: 0.0,
    severityLevel: "LOW",
    imageUrl: HEALTHY_LEAF_SVG,
    scannedAt: new Date().toISOString(),
    boundingBoxes: [
      {
        id: "box-h-1",
        ymin: 12.0,
        xmin: 18.0,
        ymax: 88.0,
        xmax: 82.0,
        label: "Vigorous Vascular Foliage (0% Necrosis)",
        confidence: 99.2,
      },
    ],
  },
};

// ============================================================================
// Standard Mock Work Order Ticket (Contractual fixture for Dev B)
// ============================================================================

export const MOCK_WORK_ORDER: WorkOrderTicket = {
  ticketId: "WO-2026-0941",
  timestamp: new Date().toISOString(),
  farmName: "Oak Ridge Commercial Farm",
  sectorId: "Sector 4B - North Quadrant",
  acreage: 140,
  diagnostic: SAMPLE_DIAGNOSTICS.potato_late_blight,
  weather: {
    temperatureC: 19.4,
    relativeHumidity: 88,
    windSpeedMph: 6.2,
    condition: "High Humidity / High Spore Velocity",
    sporeSpreadRisk: "SEVERE",
    wallinIndex: 3,
    summary: "88% RH and 19.4°C create optimal fungal germination within 48 hours.",
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
    estimatedChemicalCostUsd: 2140,
  },
  estimatedCropSavedUsd: 32400,
  chemicalSavingsPct: 34,
};
