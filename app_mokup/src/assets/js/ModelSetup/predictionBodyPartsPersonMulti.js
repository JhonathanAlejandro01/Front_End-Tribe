const predictionBodyPartsMulti = async (tracker) => {
    const config = {
        flipHorizontal: true,
        internalResolution: 'high',
        segmentationThreshold: 0.7
      }
      tracker.prediction_bodyPartsPersonMulti = await tracker.net.segmentMultiPersonParts(tracker.video, config);
    
      return tracker.prediction_bodyPartsPersonMulti; 
}
 
export default predictionBodyPartsMulti;