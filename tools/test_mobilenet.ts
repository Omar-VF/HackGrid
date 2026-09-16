import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

async function testMobileNet() {
  console.log("Loading MobileNet model...");
  const model = await mobilenet.load({ version: 2, alpha: 1.0 });
  console.log("MobileNet model loaded successfully!");

  // Create a synthetic 3D tensor simulating an image (224x224x3)
  const dummyTensor = tf.zeros([224, 224, 3]) as tf.Tensor3D;
  const predictions = await model.classify(dummyTensor);
  console.log("Predictions on dummy tensor:", predictions);
}

testMobileNet().catch(console.error);
