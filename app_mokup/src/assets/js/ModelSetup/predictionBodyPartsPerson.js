const predictionBodyParts = async (tracker) => {
    const config = {
        flipHorizontal: true,
        internalResolution: 'high',
        segmentationThreshold: 0.7
      }
      tracker.prediction_bodyPartsPerson = await tracker.net.segmentPersonParts(tracker.video, config);
    
      return tracker.prediction_bodyPartsPerson; 
}
 
export default predictionBodyParts;