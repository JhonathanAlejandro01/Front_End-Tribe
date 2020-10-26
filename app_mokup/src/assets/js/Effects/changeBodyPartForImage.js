import videoImageData from '../VideoSetup/GetVideoData.js';
import getImageData from '../VideoSetup/GetImageData.js';

const changeBodyPartImage = async (tracker, width, height, URL, option) => {
    
    //Prediction
    const {data:map} = tracker.prediction_bodyPartsPerson;
    const pixelLength = map.length;
    console.log(tracker.prediction_bodyPartsPerson);
    
    //new canvas
    const canvas = tracker.canvas_1.firstChild;

    const newImg = canvas.getContext('2d').createImageData(canvas.width, canvas.height);//create blank new ImageData
    const newImgData = newImg.data;

    const rainbow = [
        [110, 64, 170], [143, 61, 178], [178, 60, 178], [210, 62, 167],
        [238, 67, 149], [255, 78, 125], [255, 94, 99],  [255, 115, 75],
        [255, 140, 56], [239, 167, 47], [217, 194, 49], [194, 219, 64],
        [175, 240, 91], [135, 245, 87], [96, 247, 96],  [64, 243, 115],
        [40, 234, 141], [28, 219, 169], [26, 199, 194], [33, 176, 213],
        [47, 150, 224], [65, 125, 224], [84, 101, 214], [99, 81, 195]
      ];
      
      const warm = [
        [110, 64, 170], [106, 72, 183], [100, 81, 196], [92, 91, 206],
        [84, 101, 214], [75, 113, 221], [66, 125, 224], [56, 138, 226],
        [48, 150, 224], [40, 163, 220], [33, 176, 214], [29, 188, 205],
        [26, 199, 194], [26, 210, 182], [28, 219, 169], [33, 227, 155],
        [41, 234, 141], [51, 240, 128], [64, 243, 116], [79, 246, 105],
        [96, 247, 97],  [115, 246, 91], [134, 245, 88], [155, 243, 88]
      ];
      
      const spectral = [
        [158, 1, 66],    [181, 26, 71],   [202, 50, 74],   [219, 73, 74],
        [232, 94, 73],   [242, 117, 75],  [248, 142, 83],  [251, 167, 96],
        [253, 190, 112], [254, 210, 129], [254, 227, 149], [254, 240, 166],
        [251, 248, 176], [243, 249, 172], [231, 245, 163], [213, 238, 159],
        [190, 229, 160], [164, 218, 163], [137, 207, 165], [110, 192, 168],
        [86, 173, 174],  [70, 150, 179],  [67, 127, 180],  [77, 103, 173]
      ];

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
        ] = map[i] === 12 || map[i] === 13 || map[i] === 2 || map[i] === 3 || map[i] === 4 
        || map[i] === 5 || map[i] === 6 || map[i] === 7       ? [r, g, b, 255] : [
                                        videoData[i*4], 
                                        videoData[i*4 +1], 
                                        videoData[i*4 + 2], 
                                        videoData[i*4 + 3]//da la opcion de blur o no
                                    ]
    }
    if (option)
    {
        canvas.getContext('2d').putImageData(newImg, 0, 0);
    }
    else{

        const coloredPartImage = bodyPix.toColoredPartMask
        (tracker.prediction_bodyPartsPerson, rainbow);
    
        bodyPix.drawMask(
            canvas, tracker.video, coloredPartImage, .7, 0, true);
    }
    
}
 
export default changeBodyPartImage;