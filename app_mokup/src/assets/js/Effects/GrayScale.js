import videoImageData from '../VideoSetup/GetVideoData.js';

function grayScale(tracker){
    const {data:map} = tracker.prediction;
    const lengthPixels = map.length ; //como es RGBA como cada elemento es un pixel
    
    // Extracting video data
    const { data:imgData } = videoImageData(1,tracker.video.width, tracker.video.height);
    
    //new canvas
    const canvas = tracker.canvas_1.firstChild;

    const newImg = canvas.getContext('2d').createImageData(canvas.width, canvas.height);//create blank new ImageData
    const newImgData = newImg.data;
   
    //[r0, g0, b0, a0, r1, g1, b1, a1, ..., rn, gn, bn, an] cojemos de 4 en 4
    
    for (let i = 0; i < map.length; i++) {
        //sacamos los r g b del video en si 
        const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
        
        // hacemos el efecto gray color
        const gray = ((0.3 * r) + (0.59 * g) + (0.11 * b));
        [
          newImgData[i*4],
          newImgData[i*4+1],
          newImgData[i*4+2],
          newImgData[i*4+3]
        ] = !map[i] ? [gray, gray, gray, 255] : [r, g, b, a];
    }

    canvas.getContext('2d').putImageData(newImg, 0, 0);
    

}

export default grayScale;