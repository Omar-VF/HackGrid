const tf = require('@tensorflow/tfjs');

const PLANT_DISEASE_CLASSES = [
  "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
  "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_", "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy",
  "Grape___Black_rot", "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
  "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy",
  "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy",
  "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
  "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew",
  "Strawberry___Leaf_scorch", "Strawberry___healthy",
  "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
];

async function run() {
  const modelUrl = 'http://localhost:3000/plant-disease-model/model.json';
  const model = await tf.loadLayersModel(modelUrl);

  // Helper to create synthetic leaf pixels in [0, 255]
  function makeImage(type) {
    const arr = new Float32Array(224 * 224 * 3);
    for (let y = 0; y < 224; y++) {
      for (let x = 0; x < 224; x++) {
        const idx = (y * 224 + x) * 3;
        // Leaf oval
        const inLeaf = Math.pow((x - 112) / 80, 2) + Math.pow((y - 112) / 80, 2) <= 1.0;
        if (inLeaf) {
          let r = 60, g = 130, b = 50; // green
          if (type === 'potato_late_blight') {
            // Dark water-soaked lesion
            if (Math.pow((x - 140) / 35, 2) + Math.pow((y - 130) / 35, 2) <= 1.0) {
              r = 35; g = 30; b = 25;
            }
          } else if (type === 'tomato_early_blight') {
            const d = Math.hypot(x - 112, y - 112);
            if (d < 25) { r = 85; g = 55; b = 30; }
            else if (d < 35) { r = 180; g = 160; b = 40; }
          } else if (type === 'corn_rust') {
            if (y % 10 === 0 && x % 4 === 0) { r = 160; g = 75; b = 30; }
          }
          arr[idx] = r; arr[idx+1] = g; arr[idx+2] = b;
        } else {
          arr[idx] = 240; arr[idx+1] = 240; arr[idx+2] = 240;
        }
      }
    }
    return tf.tensor3d(arr, [224, 224, 3]);
  }

  for (const type of ['potato_late_blight', 'tomato_early_blight', 'corn_rust', 'healthy']) {
    console.log(`\n=== Testing ${type} ===`);
    const img = makeImage(type);

    // Normalization A: [0, 1] (x / 255.0)
    const normA = img.div(tf.scalar(255.0)).expandDims(0);
    const predA = model.predict(normA);
    const dataA = await predA.data();
    const topA = Array.from(dataA).map((v, i) => ({ class: PLANT_DISEASE_CLASSES[i], score: (v*100).toFixed(1) })).sort((a,b) => b.score - a.score).slice(0, 3);
    console.log('Norm [0, 1] (div 255):', topA);

    // Normalization B: [-1, 1] (x / 127.5 - 1.0)
    const normB = img.div(tf.scalar(127.5)).sub(tf.scalar(1.0)).expandDims(0);
    const predB = model.predict(normB);
    const dataB = await predB.data();
    const topB = Array.from(dataB).map((v, i) => ({ class: PLANT_DISEASE_CLASSES[i], score: (v*100).toFixed(1) })).sort((a,b) => b.score - a.score).slice(0, 3);
    console.log('Norm [-1, 1] (mobilenet standard):', topB);
  }
}

run().catch(console.error);
