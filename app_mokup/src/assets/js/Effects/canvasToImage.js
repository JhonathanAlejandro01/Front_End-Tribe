
const canvasToImage = (format, qualilty, img_name, canvas) => {
    //
    //Optional

    //console.log(image_Canvas);
    const a = document.createElement('a');
    a.href = canvas.toDataURL(format , qualilty);
    a.download = img_name;
    a.click();     
}
 
export default canvasToImage;