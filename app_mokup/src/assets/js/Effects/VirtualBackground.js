import getImageData from '../VideoSetup/GetImageData.js';
import videoImageData from '../VideoSetup/GetVideoData.js';


async function virtualBackground(URL, width, height, tracker, option){
    
    //new canvas
    const canvas = tracker.canvas_1.firstChild;//cremaos un blank array para llenarlo
    const newImg = canvas.getContext('2d').createImageData(canvas.width, canvas.height);//create blank new ImageData
    const newImgData = newImg.data;

    
    //prediction
    const {data:map} = tracker.prediction;
    const pixelLength = map.length;
    
    //Video Data
    const { data: videoData } = videoImageData(1,tracker.video.width, tracker.video.height);
    
    //imageData
    const {data: imgData} = await getImageData(1, URL, width, height);

    //es los pixels de no persona dibujar La imagen en si
    for (let i = 0; i < pixelLength; i++) {
        //los pixels de la imagen si es no es persona
        const [r, g, b, a] = [imgData[i*4], imgData[i*4 + 1], imgData[i*4 + 2], imgData[i*4 + 3]];

        //revisamos que sea 1 persona , 0 otra cosa
        [
            newImgData[i*4], 
            newImgData[i*4 +1],
            newImgData[i*4 + 2], 
            newImgData[i*4 + 3]
        ] = !map[i]   ? [r, g, b, 250] : [
                                        videoData[i*4], 
                                        videoData[i*4 +1], 
                                        videoData[i*4 + 2], 
                                        0//!option? videoData[i*4 + 3]:0//da la opcion de blur o no
                                    ]
    }
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    const backgroundBlur = 2;
    const virtualBackgroundOverlay = 1;
    
    bodyPix.drawMask(canvas, document.querySelector('video'), 
    newImg, virtualBackgroundOverlay, backgroundBlur, false);    

}

export default virtualBackground;