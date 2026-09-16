import { extractFeatureVectorFromPixels, queryPathologyReferenceAtlas, computeCosineSimilarity } from "../lib/rag-retriever";
import { PATHOLOGY_REFERENCE_ATLAS } from "../lib/rag-database";

console.log("===============================================================================");
console.log("🔬 TESTING VISUAL VECTOR RAG PATHOLOGY RETRIEVAL PIPELINE");
console.log("===============================================================================\n");

const W = 400;
const H = 300;

// Test 1: Cosine Similarity Properties
console.log("--- [Test 1] Cosine Similarity Math ---");
const vec1 = [1, 0, 0, 1];
const vec2 = [1, 0, 0, 1];
const vec3 = [0, 1, 1, 0];
const simIdentical = computeCosineSimilarity(vec1, vec2);
const simOrthogonal = computeCosineSimilarity(vec1, vec3);

console.log(`Identical Vector Cosine Sim: ${simIdentical} (Expected ~1.0)`);
console.log(`Orthogonal Vector Cosine Sim: ${simOrthogonal} (Expected 0.0)`);
if (Math.abs(simIdentical - 1.0) < 1e-5 && simOrthogonal === 0.0) {
  console.log("✅ PASS: Cosine vector math is mathematically exact.\n");
} else {
  console.log("❌ FAIL: Cosine math error\n");
}

// Helper to create synthetic images
function createTestBuffer(type: string): Uint8ClampedArray {
  const buf = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;

      if (type === "non_plant") {
        // Human skin / wood table
        buf[idx] = 205; buf[idx+1] = 145; buf[idx+2] = 115; buf[idx+3] = 255;
        continue;
      }

      const isCorn = type === "corn_rust";
      const inLeaf = isCorn
        ? Math.abs(x - 200) <= 35 && y >= 30 && y <= 270
        : Math.pow((x - 200) / 100, 2) + Math.pow((y - 150) / 90, 2) <= 1.0;

      if (!inLeaf) {
        buf[idx] = 240; buf[idx+1] = 240; buf[idx+2] = 240; buf[idx+3] = 255;
        continue;
      }

      let r = 70, g = 135, b = 55;
      if (type === "potato_late_blight") {
        const inLesion = Math.pow((x - 240) / 45, 2) + Math.pow((y - 170) / 45, 2) <= 1.0;
        if (inLesion) { r = 38; g = 34; b = 28; }
      } else if (type === "tomato_early_blight") {
        const d = Math.hypot(x - 180, y - 140);
        if (d <= 20) { r = 85; g = 55; b = 30; }
        else if (d <= 30) { r = 150; g = 145; b = 40; }
      } else if (type === "apple_scab") {
        const inScab = Math.pow((x - 180) / 25, 2) + Math.pow((y - 130) / 25, 2) <= 1.0;
        if (inScab) { r = 75; g = 60; b = 38; }
      } else if (type === "corn_rust") {
        const isRust = y % 8 === 0 && ((x + y) % 3 === 0);
        if (isRust) { r = 145; g = 75; b = 35; }
      }

      buf[idx] = r; buf[idx+1] = g; buf[idx+2] = b; buf[idx+3] = 255;
    }
  }
  return buf;
}

// Test 2: RAG Vector Retrieval against Reference Atlas
console.log("--- [Test 2] RAG Vector Retrieval across Pathology Database ---");
const testCases = [
  { type: "potato_late_blight", expected: "potato_late_blight", name: "Potato Late Blight" },
  { type: "tomato_early_blight", expected: "tomato_early_blight", name: "Tomato Early Blight" },
  { type: "apple_scab", expected: "apple_scab", name: "Apple Scab" },
  { type: "corn_rust", expected: "corn_rust", name: "Corn Common Rust" },
];

let allPassed = true;

for (const tc of testCases) {
  const buf = createTestBuffer(tc.type);
  const stats = extractFeatureVectorFromPixels(buf, W, H);
  const ragResult = queryPathologyReferenceAtlas(stats.queryVector, 3);

  console.log(`Query: ${tc.name}`);
  console.log(`  -> Query Vector Symptoms [indices 9..15]:`, stats.queryVector.slice(9, 16));
  console.log(`  -> Top RAG Match: ${ragResult.topMatch.commonName} [${ragResult.topMatch.specimenId}]`);
  console.log(`  -> Cosine Similarity: ${ragResult.topMatch.similarityScore}%`);
  console.log(`  -> Institution: ${ragResult.topMatch.institutionSource}`);
  console.log(`  -> Candidates: ${ragResult.candidates.map((c) => `${c.commonName} (${c.similarityScore}%)`).join(" | ")}`);

  if (ragResult.topMatch.pathogenId === tc.expected) {
    console.log(`  ✅ PASS: Accurately retrieved from Plant Pathology Reference Atlas\n`);
  } else {
    console.log(`  ❌ FAIL: Expected ${tc.expected}, got ${ragResult.topMatch.pathogenId}\n`);
    allPassed = false;
  }
}

// Test 3: Non-Plant Rejection
console.log("--- [Test 3] Non-Plant Image Rejection ---");
const nonPlantBuf = createTestBuffer("non_plant");
const nonPlantStats = extractFeatureVectorFromPixels(nonPlantBuf, W, H);
console.log(`Non-Plant Veg Ratio: ${nonPlantStats.vegetationRatio}, Skin Ratio: ${nonPlantStats.skinRatio}`);
if (nonPlantStats.vegetationRatio < 0.10 && nonPlantStats.skinRatio > 0.50) {
  console.log("✅ PASS: Non-plant image rejected before pathology retrieval.\n");
} else {
  console.log("❌ FAIL: Non-plant gate failed\n");
  allPassed = false;
}

if (allPassed) {
  console.log("===============================================================================");
  console.log("🎉 ALL RAG RETRIEVAL TESTS PASSED SUCCESSFULLY!");
  console.log("===============================================================================");
} else {
  process.exit(1);
}
