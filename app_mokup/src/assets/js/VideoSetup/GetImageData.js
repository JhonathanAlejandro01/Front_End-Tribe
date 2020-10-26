
const getImageData = async (videoid= 1, URL, width, height) => {
    
    
    //create Image object
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img_tag = document.querySelector(`video[data-videoid="${videoid}"]`);
    canvas.width = width;
    canvas.height = height;

    
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
 
export default getImageData;