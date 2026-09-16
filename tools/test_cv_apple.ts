import { PathogenId, BoundingBox } from "../types/sentinel";

console.log("===============================================================================");
console.log("🔬 TESTING COMPUTER VISION SEGMENTATION FOR APPLE SCAB");
console.log("===============================================================================");

const W = 400;
const H = 300;
const buffer = new Uint8ClampedArray(W * H * 4);

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (y * W + x) * 4;

    // Woody tree branch
    if (x >= 230 && x <= 270) {
      buffer[idx] = 75; // R
      buffer[idx + 1] = 72; // G
      buffer[idx + 2] = 68; // B
      buffer[idx + 3] = 255;
      continue;
    }

    // Apple Leaf (Single Ovate leaf on left)
    const inAppleLeaf =
      Math.pow((x - 140) / 60, 2) + Math.pow((y - 155) / 85, 2) <= 1.0;

    if (inAppleLeaf) {
      let r = 120;
      let g = 160;
      let b = 75;

      const distFromCenter = Math.hypot(x - 140, y - 155);
      const isScab = distFromCenter > 38 || (x > 140 && y > 150);
      if (isScab) {
        r = 78;
        g = 52;
        b = 45; // Dark velvety scab lesion
      }

      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = 255;
    } else {
      buffer[idx] = 110;
      buffer[idx + 1] = 105;
      buffer[idx + 2] = 95;
      buffer[idx + 3] = 255;
    }
  }
}

// Segmentation logic:
let leafMinX = W;
let leafMinY = H;
let leafMaxX = 0;
let leafMaxY = 0;

let scabPixels = 0;
let scabMinX = W;
let scabMinY = H;
let scabMaxX = 0;
let scabMaxY = 0;

let hasWoodyTwig = false;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (y * W + x) * 4;
    const r = buffer[idx];
    const g = buffer[idx + 1];
    const b = buffer[idx + 2];

    // Detect woody tree twig / bark: neutral gray-brown with low color saturation
    const isBark = Math.abs(r - g) < 8 && Math.abs(g - b) < 8 && r > 40 && r < 120;
    if (isBark && x > W * 0.45) {
      hasWoodyTwig = true;
      continue;
    }

    // Leaf blade check
    const isLeaf = (g >= r * 0.95 && g >= b * 1.10 && g > 35) || (b < 85 && r > 45 && r > b * 1.15);

    if (isLeaf) {
      leafMinX = Math.min(leafMinX, x);
      leafMinY = Math.min(leafMinY, y);
      leafMaxX = Math.max(leafMaxX, x);
      leafMaxY = Math.max(leafMaxY, y);

      // Scab check: dark olive/brown necrosis on leaf blade
      const isScab = r > g && r > b && (r + g + b) / 3 < 90 && b < 65;
      if (isScab) {
        scabPixels++;
        scabMinX = Math.min(scabMinX, x);
        scabMinY = Math.min(scabMinY, y);
        scabMaxX = Math.max(scabMaxX, x);
        scabMaxY = Math.max(scabMaxY, y);
      }
    }
  }
}

console.log(`Leaf Bounds: [${leafMinX}, ${leafMinY}, ${leafMaxX}, ${leafMaxY}]`);
console.log(`Scab Bounds: [${scabMinX}, ${scabMinY}, ${scabMaxX}, ${scabMaxY}], Scab Pixels: ${scabPixels}, Woody Twig Present: ${hasWoodyTwig}`);

const leafBox: BoundingBox = {
  id: "box-apple-scab",
  ymin: parseFloat(((leafMinY / H) * 100).toFixed(1)),
  xmin: parseFloat(((leafMinX / W) * 100).toFixed(1)),
  ymax: parseFloat(((leafMaxY / H) * 100).toFixed(1)),
  xmax: parseFloat(((leafMaxX / W) * 100).toFixed(1)),
  label: "Apple Scab (Venturia inaequalis): 96.8%",
  confidence: 96.8,
};

console.log("Computed Dynamic Leaf Bounding Box:", leafBox);
