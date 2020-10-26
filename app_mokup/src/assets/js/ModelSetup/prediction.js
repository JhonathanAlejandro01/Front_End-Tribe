async function makePredictionPerson(tracker){
    const config = {
      flipHorizontal: true,
      internalResolution: 'high',
      segmentationThreshold: 0.7
    }
    tracker.prediction = await tracker.net.segmentPerson(tracker.video, config);
  
    return tracker.prediction; 
  }

  export default makePredictionPerson;