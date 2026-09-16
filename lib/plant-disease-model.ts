// ============================================================================
// PlantVillage TensorFlow.js Model Integration
// Model: MobileNetV2 fine-tuned on PlantVillage dataset (38 disease classes)
// Source: Rishit-dagli/Greenathon-Plant-AI (Apache 2.0 license)
// Hosted: https://raw.githubusercontent.com/Rishit-dagli/Greenathon-Plant-AI/main/models/plant_disease_tfjs/
// ============================================================================

import { PathogenId } from "@/types/sentinel";

// Model is bundled locally in /public/plant-disease-model/ for instant loading
// (downloaded from Rishit-dagli/Greenathon-Plant-AI, Apache 2.0)
const MODEL_JSON_URL = "/plant-disease-model/model.json";


// The 38 PlantVillage classes in exact index order (from class_indices.json)
export const PLANT_DISEASE_CLASSES: string[] = [
  "Apple___Apple_scab",                                    // 0
  "Apple___Black_rot",                                     // 1
  "Apple___Cedar_apple_rust",                              // 2
  "Apple___healthy",                                       // 3
  "Blueberry___healthy",                                   // 4
  "Cherry_(including_sour)___Powdery_mildew",             // 5
  "Cherry_(including_sour)___healthy",                     // 6
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",   // 7
  "Corn_(maize)___Common_rust_",                           // 8
  "Corn_(maize)___Northern_Leaf_Blight",                  // 9
  "Corn_(maize)___healthy",                                // 10
  "Grape___Black_rot",                                     // 11
  "Grape___Esca_(Black_Measles)",                          // 12
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",           // 13
  "Grape___healthy",                                       // 14
  "Orange___Haunglongbing_(Citrus_greening)",              // 15
  "Peach___Bacterial_spot",                                // 16
  "Peach___healthy",                                       // 17
  "Pepper,_bell___Bacterial_spot",                         // 18
  "Pepper,_bell___healthy",                                // 19
  "Potato___Early_blight",                                 // 20
  "Potato___Late_blight",                                  // 21
  "Potato___healthy",                                      // 22
  "Raspberry___healthy",                                   // 23
  "Soybean___healthy",                                     // 24
  "Squash___Powdery_mildew",                               // 25
  "Strawberry___Leaf_scorch",                              // 26
  "Strawberry___healthy",                                  // 27
  "Tomato___Bacterial_spot",                               // 28
  "Tomato___Early_blight",                                 // 29
  "Tomato___Late_blight",                                  // 30
  "Tomato___Leaf_Mold",                                    // 31
  "Tomato___Septoria_leaf_spot",                           // 32
  "Tomato___Spider_mites Two-spotted_spider_mite",        // 33
  "Tomato___Target_Spot",                                  // 34
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus",               // 35
  "Tomato___Tomato_mosaic_virus",                          // 36
  "Tomato___healthy",                                      // 37
];

export interface DiseaseClassMapping {
  pathogenId: PathogenId;
  commonName: string;
  scientificName: string;
  cropSpecies: string;
  isHealthy: boolean;
}

export const CLASS_TO_PATHOGEN: Record<string, DiseaseClassMapping> = {
  "Apple___Apple_scab": { pathogenId: "apple_scab", commonName: "Apple Scab", scientificName: "Venturia inaequalis", cropSpecies: "Malus domestica (Apple)", isHealthy: false },
  "Apple___Black_rot": { pathogenId: "apple_scab", commonName: "Apple Black Rot", scientificName: "Botryosphaeria obtusa", cropSpecies: "Malus domestica (Apple)", isHealthy: false },
  "Apple___Cedar_apple_rust": { pathogenId: "apple_rust", commonName: "Cedar Apple Rust", scientificName: "Gymnosporangium juniperi-virginianae", cropSpecies: "Malus domestica (Apple)", isHealthy: false },
  "Apple___healthy": { pathogenId: "healthy", commonName: "Healthy Apple Foliage", scientificName: "No pathogen detected", cropSpecies: "Malus domestica (Apple)", isHealthy: true },
  "Blueberry___healthy": { pathogenId: "healthy", commonName: "Healthy Blueberry Foliage", scientificName: "No pathogen detected", cropSpecies: "Vaccinium corymbosum (Blueberry)", isHealthy: true },
  "Cherry_(including_sour)___Powdery_mildew": { pathogenId: "powdery_mildew", commonName: "Cherry Powdery Mildew", scientificName: "Podosphaera clandestina", cropSpecies: "Prunus avium / Prunus cerasus (Cherry)", isHealthy: false },
  "Cherry_(including_sour)___healthy": { pathogenId: "healthy", commonName: "Healthy Cherry Foliage", scientificName: "No pathogen detected", cropSpecies: "Prunus avium (Cherry)", isHealthy: true },
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": { pathogenId: "corn_northern_blight", commonName: "Corn Gray Leaf Spot", scientificName: "Cercospora zeae-maydis", cropSpecies: "Zea mays (Corn / Maize)", isHealthy: false },
  "Corn_(maize)___Common_rust_": { pathogenId: "corn_rust", commonName: "Corn Common Rust", scientificName: "Puccinia sorghi", cropSpecies: "Zea mays (Corn / Maize)", isHealthy: false },
  "Corn_(maize)___Northern_Leaf_Blight": { pathogenId: "corn_northern_blight", commonName: "Northern Corn Leaf Blight", scientificName: "Exserohilum turcicum", cropSpecies: "Zea mays (Corn / Maize)", isHealthy: false },
  "Corn_(maize)___healthy": { pathogenId: "healthy", commonName: "Healthy Corn Foliage", scientificName: "No pathogen detected", cropSpecies: "Zea mays (Corn / Maize)", isHealthy: true },
  "Grape___Black_rot": { pathogenId: "apple_scab", commonName: "Grape Black Rot", scientificName: "Guignardia bidwellii", cropSpecies: "Vitis vinifera (Grape)", isHealthy: false },
  "Grape___Esca_(Black_Measles)": { pathogenId: "apple_scab", commonName: "Grape Esca (Black Measles)", scientificName: "Phaeomoniella chlamydospora", cropSpecies: "Vitis vinifera (Grape)", isHealthy: false },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": { pathogenId: "tomato_early_blight", commonName: "Grape Leaf Blight", scientificName: "Pseudocercospora vitis", cropSpecies: "Vitis vinifera (Grape)", isHealthy: false },
  "Grape___healthy": { pathogenId: "healthy", commonName: "Healthy Grape Foliage", scientificName: "No pathogen detected", cropSpecies: "Vitis vinifera (Grape)", isHealthy: true },
  "Orange___Haunglongbing_(Citrus_greening)": { pathogenId: "tomato_early_blight", commonName: "Citrus Greening (HLB)", scientificName: "Candidatus Liberibacter asiaticus", cropSpecies: "Citrus sinensis (Orange)", isHealthy: false },
  "Peach___Bacterial_spot": { pathogenId: "tomato_early_blight", commonName: "Peach Bacterial Spot", scientificName: "Xanthomonas campestris pv. pruni", cropSpecies: "Prunus persica (Peach)", isHealthy: false },
  "Peach___healthy": { pathogenId: "healthy", commonName: "Healthy Peach Foliage", scientificName: "No pathogen detected", cropSpecies: "Prunus persica (Peach)", isHealthy: true },
  "Pepper,_bell___Bacterial_spot": { pathogenId: "tomato_early_blight", commonName: "Bell Pepper Bacterial Spot", scientificName: "Xanthomonas campestris pv. vesicatoria", cropSpecies: "Capsicum annuum (Bell Pepper)", isHealthy: false },
  "Pepper,_bell___healthy": { pathogenId: "healthy", commonName: "Healthy Bell Pepper Foliage", scientificName: "No pathogen detected", cropSpecies: "Capsicum annuum (Bell Pepper)", isHealthy: true },
  "Potato___Early_blight": { pathogenId: "tomato_early_blight", commonName: "Potato Early Blight", scientificName: "Alternaria solani", cropSpecies: "Solanum tuberosum (Potato)", isHealthy: false },
  "Potato___Late_blight": { pathogenId: "potato_late_blight", commonName: "Potato Late Blight", scientificName: "Phytophthora infestans", cropSpecies: "Solanum tuberosum (Potato)", isHealthy: false },
  "Potato___healthy": { pathogenId: "healthy", commonName: "Healthy Potato Foliage", scientificName: "No pathogen detected", cropSpecies: "Solanum tuberosum (Potato)", isHealthy: true },
  "Raspberry___healthy": { pathogenId: "healthy", commonName: "Healthy Raspberry Foliage", scientificName: "No pathogen detected", cropSpecies: "Rubus idaeus (Raspberry)", isHealthy: true },
  "Soybean___healthy": { pathogenId: "healthy", commonName: "Healthy Crop Foliage", scientificName: "No pathogen detected", cropSpecies: "Commercial Crop Foliage", isHealthy: true },
  "Squash___Powdery_mildew": { pathogenId: "powdery_mildew", commonName: "Squash Powdery Mildew", scientificName: "Podosphaera xanthii", cropSpecies: "Cucurbita pepo (Squash)", isHealthy: false },
  "Strawberry___Leaf_scorch": { pathogenId: "tomato_early_blight", commonName: "Strawberry Leaf Scorch", scientificName: "Diplocarpon earlianum", cropSpecies: "Fragaria × ananassa (Strawberry)", isHealthy: false },
  "Strawberry___healthy": { pathogenId: "healthy", commonName: "Healthy Strawberry Foliage", scientificName: "No pathogen detected", cropSpecies: "Fragaria × ananassa (Strawberry)", isHealthy: true },
  "Tomato___Bacterial_spot": { pathogenId: "tomato_early_blight", commonName: "Tomato Bacterial Spot", scientificName: "Xanthomonas campestris pv. vesicatoria", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Early_blight": { pathogenId: "tomato_early_blight", commonName: "Tomato Early Blight", scientificName: "Alternaria solani", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Late_blight": { pathogenId: "potato_late_blight", commonName: "Tomato Late Blight", scientificName: "Phytophthora infestans", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Leaf_Mold": { pathogenId: "powdery_mildew", commonName: "Tomato Leaf Mold", scientificName: "Passalora fulva", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Septoria_leaf_spot": { pathogenId: "tomato_early_blight", commonName: "Tomato Septoria Leaf Spot", scientificName: "Septoria lycopersici", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Spider_mites Two-spotted_spider_mite": { pathogenId: "tomato_early_blight", commonName: "Tomato Spider Mite Damage", scientificName: "Tetranychus urticae", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Target_Spot": { pathogenId: "tomato_early_blight", commonName: "Tomato Target Spot", scientificName: "Corynespora cassiicola", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": { pathogenId: "tomato_early_blight", commonName: "Tomato Yellow Leaf Curl Virus", scientificName: "TYLCV (Begomovirus)", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___Tomato_mosaic_virus": { pathogenId: "tomato_early_blight", commonName: "Tomato Mosaic Virus", scientificName: "Tomato mosaic virus (ToMV)", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: false },
  "Tomato___healthy": { pathogenId: "healthy", commonName: "Healthy Tomato Foliage", scientificName: "No pathogen detected", cropSpecies: "Solanum lycopersicum (Tomato)", isHealthy: true },
};

export interface PlantDiagnosisResult {
  className: string;
  confidence: number;
  mapping: DiseaseClassMapping;
  topCandidates: Array<{ className: string; confidence: number }>;
  modelSource: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _loadedModel: any = null;
let _isLoading = false;
let _loadError: string | null = null;

export interface ModelLoadStatus {
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export function getModelLoadStatus(): ModelLoadStatus {
  return { loaded: _loadedModel !== null, loading: _isLoading, error: _loadError };
}

/**
 * Loads the PlantVillage MobileNetV2 TF.js model from GitHub (~13MB, cached after first load).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadPlantDiseaseModel(): Promise<any> {
  if (_loadedModel) return _loadedModel;
  if (_isLoading) {
    // Wait for ongoing load
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!_isLoading) {
          clearInterval(interval);
          resolve(_loadedModel);
        }
      }, 200);
    });
  }

  _isLoading = true;
  _loadError = null;
  try {
    const tf = await import("@tensorflow/tfjs");
    console.log(`[PlantVillage CV] Loading model from ${MODEL_JSON_URL}...`);
    let model: any;
    try {
      model = await tf.loadLayersModel(MODEL_JSON_URL);
    } catch (layerErr) {
      console.warn(`[PlantVillage CV] loadLayersModel fallback to loadGraphModel:`, layerErr);
      model = await tf.loadGraphModel(MODEL_JSON_URL);
    }
    _loadedModel = model;
    console.log(`[PlantVillage CV] Model successfully loaded and ready for inference.`);
    return model;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    _loadError = msg;
    console.error(`[PlantVillage CV] Load failed: ${msg}`);
    return null;
  } finally {
    _isLoading = false;
  }
}

/**
 * Classifies a leaf image using the PlantVillage CNN.
 * Input canvas is resized to 224×224 and normalized to [0,1].
 * Returns top-K predictions or null if model unavailable.
 */
export async function classifyPlantImage(
  canvas: HTMLCanvasElement,
  topK: number = 3
): Promise<PlantDiagnosisResult | null> {
  const model = await loadPlantDiseaseModel();
  if (!model) return null;

  try {
    const tf = await import("@tensorflow/tfjs");

    const inputTensor = tf.tidy(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawPixels = tf.browser.fromPixels(canvas) as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resized = tf.image.resizeBilinear(rawPixels, [224, 224]) as any;
      const normalized = resized.toFloat().div(tf.scalar(255.0));
      return normalized.expandDims(0); // [1, 224, 224, 3]
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const predictions = model.predict(inputTensor) as any;
    const outputTensor = Array.isArray(predictions) ? predictions[0] : predictions;
    const probabilities: Float32Array = await outputTensor.data();

    inputTensor.dispose();
    if (Array.isArray(predictions)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      predictions.forEach((t: any) => t.dispose());
    } else {
      predictions.dispose();
    }

    const classScores = Array.from(probabilities).map((prob, idx) => ({
      className: PLANT_DISEASE_CLASSES[idx] ?? `class_${idx}`,
      confidence: parseFloat(((prob as number) * 100).toFixed(2)),
    }));

    // Filter class scores to authorized commercial farm crops (Potato, Tomato, Corn, Apple)
    // to prevent out-of-domain classes (Citrus, Peach, Grape, Pepper, Soybean) from corrupting predictions
    const targetScores = classScores.filter((c) => {
      const cls = c.className.toLowerCase();
      return (
        cls.startsWith("potato") ||
        cls.startsWith("tomato") ||
        cls.startsWith("corn") ||
        cls.startsWith("apple")
      );
    });

    const activeScores = targetScores.length > 0 ? targetScores : classScores;
    const sumTarget = activeScores.reduce((acc, c) => acc + c.confidence, 0);
    const normalizedScores = activeScores.map((c) => ({
      className: c.className,
      confidence: sumTarget > 0 ? parseFloat(((c.confidence / sumTarget) * 100).toFixed(2)) : c.confidence,
    })).sort((a, b) => b.confidence - a.confidence);

    const topResult = normalizedScores[0];
    const mapping: DiseaseClassMapping = CLASS_TO_PATHOGEN[topResult.className] ?? {
      pathogenId: "non_plant_detected" as PathogenId,
      commonName: topResult.className.replace(/___/g, " ").replace(/_/g, " "),
      scientificName: "Unknown pathogen",
      cropSpecies: "Commercial Agricultural Foliage",
      isHealthy: false,
    };

    return {
      className: topResult.className,
      confidence: topResult.confidence,
      mapping,
      topCandidates: normalizedScores.slice(0, Math.max(1, topK)),
      modelSource: "PlantVillage MobileNetV2 (USDA / PlantVillage Pathology Benchmark)",
    };
  } catch (err) {
    console.error("[PlantVillage CV] Inference error:", err);
    return null;
  }
}
