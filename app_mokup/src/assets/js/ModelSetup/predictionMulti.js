async function makePredictionMultiPerson(tracker){
    const config = {
        flipHorizontal: true,
        internalResolution: 'high',
        segmentationThreshold: 0.7,
        maxDetections: 10,
        scoreThreshold: 0.2,
        nmsRadius: 20,
        minKeypointScore: 0.3,
        refineSteps: 10
    }

    tracker.prediction = await tracker.net.segmentMultiPerson(tracker.video, config);
    //console.log(prediction);
    return tracker.prediction; 
  }

  export default makePredictionMultiPerson;