const videoImageData = (videoid = 1, width, height) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = document.querySelector(`video[data-videoid="${videoid}"]`);
    canvas.width = width;
    canvas.height = height;
    
    context.drawImage(img, 0, 0 );
    var theData = context.getImageData(0, 0, width, height);
    return theData;
}
 
export default videoImageData;