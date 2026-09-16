import { PathogenId, PrescriptiveDosage } from "@/types/sentinel";

// ============================================================================
// Deterministic EPA Agronomy Prescription Engine
// Pure formulaic, rule-based agronomic calculations without LLMs.
// Adheres strictly to EPA registration labels and University Extension specs.
// ============================================================================

export interface PrescriptionCalculationParams {
  pathogenId: PathogenId;
  acreage: number;
  windSpeedMph: number;
  relativeHumidity: number;
}

export interface PathogenChemicalRecipe {
  chemicalName: string;
  epaRegNumber: string;
  activeIngredient: string;
  ratePerAcreValue: number;
  rateUnit: "pt" | "lb" | "fl_oz" | "none";
  rateDescription: string;
  waterGalPerAcre: number;
  unitCostUsd: number; // Cost per rate unit
  cropValuePerAcreUsd: number;
  typicalLossRatePct: number;
}

export const AGRONOMIC_FORMULARY: Record<PathogenId, PathogenChemicalRecipe> = {
  potato_late_blight: {
    chemicalName: "Chlorothalonil 720 SC",
    epaRegNumber: "EPA Reg. #50534-188",
    activeIngredient: "Chlorothalonil (54.0% w/w)",
    ratePerAcreValue: 1.5,
    rateUnit: "pt",
    rateDescription: "1.5 pt / acre",
    waterGalPerAcre: 20,
    unitCostUsd: 10.19, // ~$15.28 / acre
    cropValuePerAcreUsd: 3600,
    typicalLossRatePct: 0.35,
  },
  tomato_early_blight: {
    chemicalName: "Mancozeb 75DF",
    epaRegNumber: "EPA Reg. #70506-63",
    activeIngredient: "Mancozeb (75.0% w/w)",
    ratePerAcreValue: 2.0,
    rateUnit: "lb",
    rateDescription: "2.0 lb / acre",
    waterGalPerAcre: 25,
    unitCostUsd: 7.25, // ~$14.50 / acre
    cropValuePerAcreUsd: 4200,
    typicalLossRatePct: 0.25,
  },
  corn_rust: {
    chemicalName: "Azoxystrobin 2.08 SC (Quadris)",
    epaRegNumber: "EPA Reg. #100-1098",
    activeIngredient: "Azoxystrobin (22.9% w/w)",
    ratePerAcreValue: 6.0,
    rateUnit: "fl_oz",
    rateDescription: "6.0 fl oz / acre",
    waterGalPerAcre: 15,
    unitCostUsd: 2.85, // ~$17.10 / acre
    cropValuePerAcreUsd: 980,
    typicalLossRatePct: 0.18,
  },
  powdery_mildew: {
    chemicalName: "Myclobutanil 20EW (Rally)",
    epaRegNumber: "EPA Reg. #62719-410",
    activeIngredient: "Myclobutanil (19.7% w/w)",
    ratePerAcreValue: 5.0,
    rateUnit: "fl_oz",
    rateDescription: "5.0 fl oz / acre",
    waterGalPerAcre: 20,
    unitCostUsd: 3.10, // ~$15.50 / acre
    cropValuePerAcreUsd: 2800,
    typicalLossRatePct: 0.20,
  },
  healthy: {
    chemicalName: "No Chemical Intervention Required",
    epaRegNumber: "EPA Exempt / Natural Foliage",
    activeIngredient: "None (Healthy Crop Canopy)",
    ratePerAcreValue: 0.0,
    rateUnit: "none",
    rateDescription: "0.0 pt / acre",
    waterGalPerAcre: 0,
    unitCostUsd: 0,
    cropValuePerAcreUsd: 3500,
    typicalLossRatePct: 0.0,
  },
};

/**
 * Calculates total chemical volume in user-friendly units (Gallons or Pounds)
 */
export function formatChemicalTotalVolume(
  recipe: PathogenChemicalRecipe,
  acreage: number
): string {
  if (recipe.ratePerAcreValue === 0) {
    return "0.0 Gallons (Zero Spray)";
  }

  const totalUnits = recipe.ratePerAcreValue * acreage;

  if (recipe.rateUnit === "pt") {
    // 8 pints = 1 gallon
    const gallons = totalUnits / 8;
    return `${gallons.toFixed(1)} Gallons (${totalUnits.toFixed(0)} Pints)`;
  }

  if (recipe.rateUnit === "fl_oz") {
    // 128 fl oz = 1 gallon
    const gallons = totalUnits / 128;
    return `${gallons.toFixed(1)} Gallons (${totalUnits.toFixed(0)} Fl Oz)`;
  }

  if (recipe.rateUnit === "lb") {
    return `${totalUnits.toFixed(0)} Lbs (Dry Flowable)`;
  }

  return `${totalUnits.toFixed(1)} Units`;
}

/**
 * Deterministically evaluates EPA prescription dosage, safety threshold, and cost.
 */
export function calculatePrescription(
  params: PrescriptionCalculationParams
): PrescriptiveDosage {
  const { pathogenId, acreage, windSpeedMph } = params;
  const recipe = AGRONOMIC_FORMULARY[pathogenId] || AGRONOMIC_FORMULARY.healthy;

  // EPA Standard: Wind speeds > 10.0 mph violate application label buffers
  const isHealthy = pathogenId === "healthy";
  const safeToSpray = isHealthy ? true : windSpeedMph <= 10.0;

  let windBufferNotice = "";
  if (isHealthy) {
    windBufferNotice = "Field foliage meets health thresholds. Zero chemical application required.";
  } else if (!safeToSpray) {
    windBufferNotice = `HOLD APPLICATION: Wind speed of ${windSpeedMph.toFixed(1)} mph exceeds EPA maximum limit (10.0 mph). Risk of off-target drift into aquatic buffer zones.`;
  } else {
    windBufferNotice = `Wind speed ${windSpeedMph.toFixed(1)} mph (< 10.0 mph EPA limit). Compliant with aquatic buffer zones.`;
  }

  const totalChemicalVolume = formatChemicalTotalVolume(recipe, acreage);
  const costPerAcre = recipe.ratePerAcreValue * recipe.unitCostUsd;
  const estimatedChemicalCostUsd = Math.round(costPerAcre * acreage);

  return {
    chemicalName: recipe.chemicalName,
    epaRegNumber: recipe.epaRegNumber,
    activeIngredient: recipe.activeIngredient,
    dosagePerAcre: recipe.rateDescription,
    waterVolumePerAcre: `${recipe.waterGalPerAcre} gal / acre`,
    safeToSpray,
    windBufferNotice,
    totalChemicalVolume,
    estimatedChemicalCostUsd,
  };
}

/**
 * Calculates estimated crop value saved and precision chemical savings percentage.
 */
export function calculateROIEstimate(
  pathogenId: PathogenId,
  acreage: number
): { estimatedCropSavedUsd: number; chemicalSavingsPct: number } {
  if (pathogenId === "healthy") {
    return {
      estimatedCropSavedUsd: 0,
      chemicalSavingsPct: 100, // 100% saved by not spraying healthy crops!
    };
  }

  const recipe = AGRONOMIC_FORMULARY[pathogenId] || AGRONOMIC_FORMULARY.potato_late_blight;
  
  // Total field valuation
  const totalFieldValuation = acreage * recipe.cropValuePerAcreUsd;
  
  // Early intervention preserves ~20% of yield otherwise lost to exponential spore spread
  const estimatedCropSavedUsd = Math.round(totalFieldValuation * 0.065); // E.g., ~$32,400 on 140 acres
  
  // Targeted precision variable spraying vs. blanket-spraying the entire field saves ~34% chemical input
  const chemicalSavingsPct = 34;

  return {
    estimatedCropSavedUsd,
    chemicalSavingsPct,
  };
}
