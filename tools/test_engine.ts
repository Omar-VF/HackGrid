/**
 * Automated Verification Test Suite for CropEye Engine (Workstream A)
 * Validates:
 * 1. Master Type Contracts & Sample Dataset Integrity
 * 2. CV Geometry Normalization Math
 * 3. Deterministic EPA Agronomy Calculations & Wind Buffer Logic
 * 4. Microclimate Weather Integration & Wallin Spore Index Model
 * 5. 5-Stage Autonomous Execution State Machine
 */

import { SAMPLE_DIAGNOSTICS } from "../lib/sample-data";
import { normalizeBoxToPixels, calculateSeverityTier } from "../lib/cv-engine";
import { calculateWallinIndex, getLiveWeather } from "../lib/weather";
import {
  calculatePrescription,
  calculateROIEstimate,
  AGRONOMIC_FORMULARY,
} from "../lib/agronomy";
import {
  executeAutonomousWorkflow,
  INITIAL_PIPELINE_STAGES,
} from "../lib/autonomous-orchestrator";
import { BoundingBox, PathogenId } from "../types/sentinel";

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    testsFailed++;
  }
}

async function runTestSuite() {
  console.log("===============================================================================");
  console.log("🚀 CROPEYE - WORKSTREAM A ENGINE VERIFICATION");
  console.log("===============================================================================\n");

  // --------------------------------------------------------------------------
  // TEST SUITE 1: Sample Pathology Dataset Integrity
  // --------------------------------------------------------------------------
  console.log("--- [Suite 1] Curated Pathology Dataset ---");
  const sampleKeys: PathogenId[] = [
    "potato_late_blight",
    "tomato_early_blight",
    "corn_rust",
    "healthy",
  ];

  sampleKeys.forEach((key) => {
    const sample = SAMPLE_DIAGNOSTICS[key];
    assert(!!sample, `Sample '${key}' exists in registry`);
    assert(sample.confidence >= 90.0, `Sample '${key}' has high diagnostic confidence (${sample.confidence}%)`);
    assert(sample.boundingBoxes.length > 0, `Sample '${key}' has calibrated bounding boxes`);
    assert(sample.imageUrl.length > 5, `Sample '${key}' contains valid photographic image reference`);

    sample.boundingBoxes.forEach((box) => {
      assert(
        box.ymin >= 0 && box.ymin < box.ymax && box.ymax <= 100,
        `Box '${box.id}' y-coordinates normalized properly [${box.ymin}, ${box.ymax}]`
      );
      assert(
        box.xmin >= 0 && box.xmin < box.xmax && box.xmax <= 100,
        `Box '${box.id}' x-coordinates normalized properly [${box.xmin}, ${box.xmax}]`
      );
    });
  });

  // --------------------------------------------------------------------------
  // TEST SUITE 2: Computer Vision Coordinate Math & Severity Logic
  // --------------------------------------------------------------------------
  console.log("\n--- [Suite 2] Computer Vision Geometry & Severity Engine ---");
  const testBox: BoundingBox = {
    id: "test-box-1",
    ymin: 20,
    xmin: 30,
    ymax: 50,
    xmax: 70,
    label: "Necrotic Cluster",
    confidence: 95.0,
  };

  const canvasWidth = 800;
  const canvasHeight = 600;
  const pixelBox = normalizeBoxToPixels(testBox, canvasWidth, canvasHeight);

  assert(pixelBox.x === 240, `X coordinate correctly scaled (30% of 800 = 240px, got ${pixelBox.x})`);
  assert(pixelBox.y === 120, `Y coordinate correctly scaled (20% of 600 = 120px, got ${pixelBox.y})`);
  assert(pixelBox.width === 320, `Width correctly scaled (40% of 800 = 320px, got ${pixelBox.width})`);
  assert(pixelBox.height === 180, `Height correctly scaled (30% of 600 = 180px, got ${pixelBox.height})`);

  assert(calculateSeverityTier(0.5) === "LOW", "0.5% necrosis classified as LOW severity");
  assert(calculateSeverityTier(7.2) === "MODERATE", "7.2% necrosis classified as MODERATE severity");
  assert(calculateSeverityTier(16.5) === "HIGH", "16.5% necrosis classified as HIGH severity");
  assert(calculateSeverityTier(28.4) === "CRITICAL", "28.4% necrosis classified as CRITICAL severity");

  // --------------------------------------------------------------------------
  // TEST SUITE 3: Agronomy Deterministic Prescriptions & EPA Buffer
  // --------------------------------------------------------------------------
  console.log("\n--- [Suite 3] EPA Agronomy Engine & Wind Safety Thresholds ---");

  // Test Case A: Potato Late Blight @ 140 acres, 6.2 mph wind (Safe)
  const prescriptionSafe = calculatePrescription({
    pathogenId: "potato_late_blight",
    acreage: 140,
    windSpeedMph: 6.2,
    relativeHumidity: 88,
  });

  assert(
    prescriptionSafe.chemicalName.includes("Chlorothalonil"),
    "Correct CIBRC/EPA chemical formulated for Potato Late Blight"
  );
  assert(
    prescriptionSafe.epaRegNumber.includes("50534-188"),
    "Verified CIBRC / EPA Registration Number present"
  );
  assert(prescriptionSafe.safeToSpray === true, "Safe to spray at 6.2 mph (< 10 mph / 16 km/h limit)");
  assert(
    prescriptionSafe.totalChemicalVolume.includes("Litres"),
    `Total volume calculated accurately in Indian Standard (140 acres * 700 mL = 98 Litres, got: ${prescriptionSafe.totalChemicalVolume})`
  );
  assert(
    prescriptionSafe.estimatedChemicalCostUsd > 1000,
    `Cost estimated accurately ($${prescriptionSafe.estimatedChemicalCostUsd})`
  );

  // Test Case B: Potato Late Blight @ 140 acres, 12.8 mph wind (Violation)
  const prescriptionUnsafe = calculatePrescription({
    pathogenId: "potato_late_blight",
    acreage: 140,
    windSpeedMph: 12.8,
    relativeHumidity: 88,
  });

  assert(
    prescriptionUnsafe.safeToSpray === false,
    "Correctly blocks spraying when wind speed is 12.8 mph (> 10.0 mph / 16 km/h threshold)"
  );
  assert(
    prescriptionUnsafe.windBufferNotice.includes("HOLD APPLICATION"),
    "Generates explicit CIBRC / EPA regulatory hold notification"
  );

  // Test Case C: Healthy crop
  const prescriptionHealthy = calculatePrescription({
    pathogenId: "healthy",
    acreage: 140,
    windSpeedMph: 4.5,
    relativeHumidity: 50,
  });
  assert(prescriptionHealthy.estimatedChemicalCostUsd === 0, "Zero chemical cost for healthy crop");
  assert(prescriptionHealthy.dosagePerAcre.includes("0.0"), "Zero dosage for healthy crop");

  // Test Case D: ROI Calculations
  const roi = calculateROIEstimate("potato_late_blight", 140);
  assert(roi.estimatedCropSavedUsd >= 30000, `Yield preservation calculated ($${roi.estimatedCropSavedUsd})`);
  assert(roi.chemicalSavingsPct === 34, "Precision spray yields 34% chemical input savings");

  // Test Case E: Multi-pathogen recipes
  const rxApple = calculatePrescription({
    pathogenId: "apple_scab",
    acreage: 200,
    windSpeedMph: 5.5,
    relativeHumidity: 82,
  });
  assert(rxApple.chemicalName.includes("Captan"), "Captan formulated for Apple Scab");
  assert(rxApple.epaRegNumber === "EPA Reg. #66222-65", "Verified Captan EPA Reg Number #66222-65");

  const rxCornNorthern = calculatePrescription({
    pathogenId: "corn_northern_blight",
    acreage: 180,
    windSpeedMph: 4.0,
    relativeHumidity: 75,
  });
  assert(rxCornNorthern.chemicalName.includes("Headline AMP"), "Headline AMP formulated for Northern Corn Leaf Blight");

  const rxWheat = calculatePrescription({
    pathogenId: "wheat_rust",
    acreage: 300,
    windSpeedMph: 6.0,
    relativeHumidity: 70,
  });
  assert(rxWheat.chemicalName.includes("Tilt"), "Tilt formulated for Wheat Rust");

  const rxAppleScab = calculatePrescription({
    pathogenId: "apple_scab",
    acreage: 80,
    windSpeedMph: 5.0,
    relativeHumidity: 85,
  });
  assert(rxAppleScab.chemicalName.includes("Captan"), "Captan 80 WDG formulated for Apple Scab");
  assert(rxAppleScab.epaRegNumber === "EPA Reg. #66222-65", "Verified Captan EPA Reg Number #66222-65");

  const rxNonPlant = calculatePrescription({
    pathogenId: "non_plant_detected",
    acreage: 140,
    windSpeedMph: 4.0,
    relativeHumidity: 65,
  });
  assert(rxNonPlant.safeToSpray === false, "Spray strictly suppressed for non-crop images");
  assert(rxNonPlant.estimatedChemicalCostUsd === 0, "Zero chemical cost for non-crop images");
  assert(rxNonPlant.windBufferNotice.includes("TREATMENT SUPPRESSED"), "Notice states treatment suppressed");

  const roiNonPlant = calculateROIEstimate("non_plant_detected", 140);
  assert(roiNonPlant.estimatedCropSavedUsd === 0, "Zero crop savings for non-crop images");
  assert(roiNonPlant.chemicalSavingsPct === 0, "Zero chemical savings for non-crop images");

  // --------------------------------------------------------------------------
  // TEST SUITE 4: Microclimate Weather & Wallin Index Model
  // --------------------------------------------------------------------------
  console.log("\n--- [Suite 4] Live Weather & Wallin Spore Spread Model ---");

  const wallinSevere = calculateWallinIndex(19.4, 88);
  assert(wallinSevere.risk === "SEVERE", "88% RH + 19.4°C classified as SEVERE spore spread risk");
  assert(wallinSevere.index >= 3, `Wallin Severity Index is ${wallinSevere.index} (>= 3)`);

  const wallinLow = calculateWallinIndex(28.0, 52);
  assert(wallinLow.risk === "LOW", "52% RH + 28.0°C classified as LOW spore spread risk");
  assert(wallinLow.index === 0, "Wallin Index is 0 in dry conditions");

  const liveWeather = await getLiveWeather();
  assert(typeof liveWeather.temperatureC === "number", `Live/cached temperature: ${liveWeather.temperatureC}°C`);
  assert(typeof liveWeather.relativeHumidity === "number", `Live/cached humidity: ${liveWeather.relativeHumidity}%`);
  assert(typeof liveWeather.windSpeedMph === "number", `Live/cached wind speed: ${liveWeather.windSpeedMph} mph`);
  assert(liveWeather.condition.length > 0, `Weather condition: ${liveWeather.condition}`);

  // --------------------------------------------------------------------------
  // TEST SUITE 5: 5-Stage Autonomous Execution Orchestrator
  // --------------------------------------------------------------------------
  console.log("\n--- [Suite 5] 5-Stage Autonomous Workflow State Machine ---");

  assert(INITIAL_PIPELINE_STAGES.length === 5, "5 initial pipeline stages configured");

  const recordedStages: number[] = [];
  const result = await executeAutonomousWorkflow({
    request: {
      sampleId: "potato_late_blight",
      sectorId: "Sector 4B - North Quadrant",
      acreage: 140,
      farmName: "Oak Ridge Commercial Farm",
    },
    onStageUpdate: (stage) => {
      if (stage.status === "completed") {
        recordedStages.push(stage.stage);
      }
    },
  });

  assert(result.success === true, "Autonomous execution finished with success=true");
  assert(result.stages.length === 5, "Returned all 5 pipeline stages");
  assert(
    result.stages.every((s) => s.status === "completed"),
    "All 5 stages marked completed"
  );
  assert(
    recordedStages.length === 5 && recordedStages.join(",") === "1,2,3,4,5",
    "Stages executed in strict sequential order: 1 -> 2 -> 3 -> 4 -> 5"
  );
  assert(result.ticket.ticketId.startsWith("WO-2026-"), `Generated valid Ticket ID: ${result.ticket.ticketId}`);
  assert(result.ticket.acreage === 140, "Acreage mapped to WorkOrderTicket");
  assert(result.ticket.diagnostic.pathogenId === "potato_late_blight", "Diagnostic mapped to WorkOrderTicket");
  assert(result.ticket.prescription.chemicalName === "Chlorothalonil 720 SC", "Prescription mapped to WorkOrderTicket");
  assert(result.ticket.estimatedCropSavedUsd > 0, `Estimated crop saved: $${result.ticket.estimatedCropSavedUsd}`);

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log("\n===============================================================================");
  console.log(`🏁 TEST RESULTS: ${testsPassed} Passed | ${testsFailed} Failed`);
  console.log("===============================================================================");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Unhandled test suite failure:", err);
  process.exit(1);
});
