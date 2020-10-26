async function loadModel(architecture, outputStride, multiplier, quantBytes){

    const modelConfig = {
      architecture: architecture,
      outputStride: outputStride,
      multiplier: multiplier,
      quantBytes: quantBytes
    };
  
    return await bodyPix.load(modelConfig)
  }
  export default loadModel;

  