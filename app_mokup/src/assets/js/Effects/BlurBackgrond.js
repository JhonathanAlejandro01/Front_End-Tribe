

async function blurBackground (canvas, img_video, segmentation, 
    backgroundBlurAmount = 10,edgeBlurAmount = 5, flipHorizontal){
    await bodyPix.drawBokehEffect(
        canvas, img_video, segmentation, backgroundBlurAmount,
            edgeBlurAmount, flipHorizontal);
}

export default blurBackground;
