
async function virtualBackground_(prediction, canvasElement, videoElement, config){
    


    const {URL, width, height} = config;
    //new canvas
    const canvas = canvasElement;//cremaos un blank array para llenarlo
    const newImg = canvas.getContext('2d').createImageData(width, height);//create blank new ImageData
    const newImgData = newImg.data;

    

    //prediction
    const {data:map} = prediction;
    const pixelLength = map.length;
    
    //Video Data
    const { data: videoData } = await videoImageData(width, height, videoElement);
    //console.log(videoData);
    //imageData
    const {data: imgData} = await getImageData(width, height, URL);
    //console.log(imgData);

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
    
    bodyPix.drawMask(canvas, videoElement, newImg, virtualBackgroundOverlay, backgroundBlur, false);    


}

export default virtualBackground_;


const videoImageData = async (width, height, videoElement) => {
    /*Create Canvas*/
    
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    
    /*Write data To image*/
    const context = canvas.getContext('2d');
    const img = videoElement;
    
    context.drawImage(img, 0, 0 );
    var theData = context.getImageData(0, 0, width, height);


    return theData;
}


const getImageData = async (width, height, URL) => {
    
    
    //create Image object
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    /*create new image*/
    const img = new Image();
    img.crossOrigin = '';
    await new Promise(r => img.onload=r, img.src=URL);
    
    //resize image to canvas
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, img.width, img.height, //source rectangle
                        0,0, width, height);//destination rectangle


    // como ya esta dibujo en el canvas temporal devolvemos el array de pixeles
    return ctx.getImageData(0, 0, width, height);
    
}