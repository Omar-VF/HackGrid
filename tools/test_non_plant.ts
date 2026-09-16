import { DiagnosticResult } from "../types/sentinel";

console.log("===============================================================================");
console.log("🧪 TESTING NON-PLANT DETECTION ON MULTIPLE SCENARIOS");
console.log("===============================================================================");

const W = 400;
const H = 300;

function evaluateBuffer(data: Uint8ClampedArray, W: number, H: number) {
  let totalPixels = 0;
  let vegetationPixels = 0;
  let skinPixels = 0;
  let neutralIndoorPixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a < 50) continue;
    totalPixels++;

    // Excess Green Index (ExG = 2G - R - B)
    const exG = 2 * g - r - b;
    // Green Leaf Index: GLI = (2G - R - B) / (2G + R + B)
    const gli = (2 * g - r - b) / Math.max(1, 2 * g + r + b);

    // Human skin detection (standard Fitzpatrick skin tone chromaticity)
    const isSkin =
      (r > g + 15 && g > b && r > 100 && (r - g) > (g - b) * 0.4 && (r + g + b) / 3 > 80) ||
      (r > 130 && g > 80 && b > 60 && r - g > 20 && r - b > 35);

    // Neutral indoor / background (walls, tables, clothes, screens)
    const isNeutralIndoor =
      Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && Math.abs(r - b) < 22;

    // Strict Plant Chlorophyll verification:
    // Requires positive ExG, positive GLI, green dominance over red/blue, and not skin/indoor
    const isChlorophyllGreen =
      !isSkin &&
      !isNeutralIndoor &&
      exG > 12 &&
      gli > 0.05 &&
      g > 40 &&
      g > r * 0.92 &&
      g > b * 1.12;

    // Diseased / chlorotic foliar tissue (yellowing/necrosis on leaf)
    const isChloroticFoliar =
      !isSkin &&
      !isNeutralIndoor &&
      r > 65 &&
      g > 60 &&
      b < Math.min(r, g) * 0.85 &&
      Math.abs(r - g) < 40 &&
      exG > -15;

    const isPlant = isChlorophyllGreen || isChloroticFoliar;

    if (isSkin) skinPixels++;
    if (isNeutralIndoor) neutralIndoorPixels++;
    if (isPlant) vegetationPixels++;
  }

  const vegRatio = vegetationPixels / Math.max(1, totalPixels);
  const skinRatio = skinPixels / Math.max(1, totalPixels);
  const indoorRatio = neutralIndoorPixels / Math.max(1, totalPixels);

  const isNonPlant = vegRatio < 0.12 || (skinRatio > 0.20 && vegRatio < 0.15) || (indoorRatio > 0.65 && vegRatio < 0.10);

  return {
    vegRatio,
    skinRatio,
    indoorRatio,
    isNonPlant
  };
}

// Scenario 1: Group of People (Faces, blue shirts, gray background)
const peopleBuffer = new Uint8ClampedArray(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (y * W + x) * 4;
    // Blue shirt
    if (y > 150) {
      peopleBuffer[idx] = 40;
      peopleBuffer[idx + 1] = 70;
      peopleBuffer[idx + 2] = 180;
      peopleBuffer[idx + 3] = 255;
    } else if (x > 100 && x < 300 && y > 30 && y < 150) {
      // Faces
      peopleBuffer[idx] = 210;
      peopleBuffer[idx + 1] = 160;
      peopleBuffer[idx + 2] = 130;
      peopleBuffer[idx + 3] = 255;
    } else {
      // Wall / office
      peopleBuffer[idx] = 200;
      peopleBuffer[idx + 1] = 200;
      peopleBuffer[idx + 2] = 205;
      peopleBuffer[idx + 3] = 255;
    }
  }
}

const peopleResult = evaluateBuffer(peopleBuffer, W, H);
console.log("People Scenario Result:", peopleResult);
if (peopleResult.isNonPlant) {
  console.log("✅ SUCCESS: Correctly rejected People Image as Non-Plant Specimen!");
} else {
  console.log("❌ FAILED: False positive on people image!");
}

// Scenario 2: Real Leaf with Asian Soybean Rust
const rustBuffer = new Uint8ClampedArray(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (y * W + x) * 4;
    const inLeaf = Math.pow((x - 200) / 140, 2) + Math.pow((y - 150) / 110, 2) <= 1.0;
    if (inLeaf) {
      const isRust = (x * 7 + y * 13) % 11 === 0;
      if (isRust) {
        rustBuffer[idx] = 135;
        rustBuffer[idx + 1] = 95;
        rustBuffer[idx + 2] = 50;
      } else {
        rustBuffer[idx] = 70;
        rustBuffer[idx + 1] = 140;
        rustBuffer[idx + 2] = 60;
      }
    } else {
      rustBuffer[idx] = 20;
      rustBuffer[idx + 1] = 20;
      rustBuffer[idx + 2] = 20;
    }
    rustBuffer[idx + 3] = 255;
  }
}

const rustResult = evaluateBuffer(rustBuffer, W, H);
console.log("Soybean Leaf Scenario Result:", rustResult);
if (!rustResult.isNonPlant && rustResult.vegRatio > 0.3) {
  console.log("✅ SUCCESS: Correctly recognized real leaf foliage!");
} else {
  console.log("❌ FAILED: Rejected real leaf!");
}
