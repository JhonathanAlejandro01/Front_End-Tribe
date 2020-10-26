//Class Video_Tracking
console.log("Si me reconocio");
class VideoTracking {
    constructor(model_config_number, config_prediction_number, type_device_number, device_id_str = 'null' ){

        this.model_architeture_options = [{architecture: "MobileNetV1", outputStride: 16, multiplier: 0.5, quantBytes: 2,},
            { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2},
            { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2}, 
            { architecture: 'MobileNetV1', outputStride: 8, multiplier: 1, quantBytes: 2},
            { architecture: 'ResNet50', outputStride: 16, quantBytes: 2}];
        
        this.effect_config_precission = [{  flipHorizontal: false, internalResolution: 'low', segmentationThreshold: 0.7},
            {  flipHorizontal: false, internalResolution: 'medium', segmentationThreshold: 0.7},
            {  flipHorizontal: false, internalResolution: 'high', segmentationThreshold: 0.7},
            {  flipHorizontal: false, internalResolution: 'ultra', segmentationThreshold: 0.7}];
        
        this.type_of_device = [ { audio: false, video: { facingMode: "user", width: 960, height: 540 }},
            { audio: false, video: { facingMode: { exact: "environment" }, width: 960, height: 540 }},
            { audio: false, video: {deviceId: device_id_str,  width: 960, height:  540 }},
            { audio: false, video: { width:  960, height: 540 }}];


        this.selection_model_option =  this.model_architeture_options[model_config_number];

        this.selection_effect_option = this.effect_config_precission[config_prediction_number];
        
        this.selection_type_device = this.type_of_device[type_device_number];
        
        this.model = this._load_model(this.selection_model_option);/*Promise Containtng Model*/
        this.videoStream =  this.load_Video_stream( this.selection_type_device);/*Promise Containing Video MediaStream*/
        this.canvasElemenet = this.createCanvas(960, 540);
        this.VideoElement = this.createVideo(960, 540); /*Video Element*/



     
        //this.canvasElement = this.createCanvas(this.width, this.height);/*Create canvas to Write to setting some dimensions*/


        /*podemos usar esto*/
        this.predictionModel = new Prediction (this.model, this.videoStream, this.canvasElemenet);
    }

    createCanvas(width, height){
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        return canvas
      }

    
    static addVideo(HTMLelement, videoElement) {
        HTMLelement.appendChild(videoElement);
      }
    
     _load_model(model_config){
        return  bodyPix.load(model_config);
    }



    async load_Video_stream(config_constrains){
     
        const stream = await navigator.mediaDevices.getUserMedia(config_constrains);/*MediaStream Video*/

        this.deviceId = stream.getVideoTracks()[0].getCapabilities().deviceId;
        this.frameRate = stream.getVideoTracks()[0].getCapabilities().frameRate;
        this.height = stream.getVideoTracks()[0].getCapabilities().height;
        this.width = stream.getVideoTracks()[0].getCapabilities().width;
        this.VideoElement.srcObject = stream;/*SetVideo Stream Source*/ /*MediaStream Video*/
        this.video_stream = stream;

        return this.PromiseCreator();
    }




    
    createVideo(width, height){
        /*Create Video de donde sacaramos la informacion para hacer la prediccion y posteriormente dibujar el canvas*/
        const video = document.createElement('video');

        video.setAttribute('autoplay','false');
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        //video.setAttribute('playsinline', 'false');
        //video.setAttribute('controls', 'false');
        //video.style.visibility = 'visible';
        video.style.display = 'none';
        return video;
    }


    
    PromiseCreator ()  { /* Return Promise VideoElement when all data is loaded and ready  with certains dimensions*/
        return new Promise((resolve, reject) => {
            this.VideoElement.onloadedmetadata = () => {
                this.VideoElement.width = this.VideoElement.videoWidth;
                this.VideoElement.height = this.VideoElement.videoHeight;
            resolve(this.VideoElement);
          };
        });
      }


}




//Class Prediction
class Prediction {
   /*config = flipHorizontal: true, internalResolution: 'high', segmentationThreshold: 0.7*/
   /*config (additional for MultiPerson) = maxDetections: 10,scoreThreshold: 0.2, nmsRadius: 20, minKeypointScore: 0.3, refineSteps: 10*/
   /* type_prediciton = String 'Person', 'MultiPerson'*/ 
    constructor( loaded_model, videoMediaStream, canvasElemenet){

        this.loaded_model = loaded_model;/*Promise of Model*/
        this.videoMediaStream = videoMediaStream;
        this.stop = false;/*Stop Animation Loop*/
        this.canvasElement = canvasElemenet;
    }

    async make_prediction_load(){ /* Returns unit8Campled for every pixel in the Ho*Wo Element array 0: Backgrounnd : 1:Person*/
        /*type_prediciton 1 --> Person, 2 --> MultiPerson, 3 --> BodyParts Prediciton/
        /*HTMLVideoElement --> ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement*/
        if (typeof this.loaded_video === 'undefined'){/* Load one time video MediaStream if was not loaded yet*/
            this.loaded_video = await this.videoMediaStream;
            this.model_prediction = await this.loaded_model;/*cargando el model*/
            /*add video to HTML*/
            this.height = this.loaded_video.srcObject.getVideoTracks()[0].getCapabilities().height;
            this.width = this.loaded_video.srcObject.getVideoTracks()[0].getCapabilities().width;

            
            VideoTracking.addVideo(document.querySelector('body'), this.loaded_video );// No es necesario anadir el HTML.... xd
        }
    }

    async stream_properties_mediaStream(){
        await this.make_prediction_load();/*if video is no loaded yet*/
        this.deviceId = this.loaded_video.srcObject.getVideoTracks()[0].getCapabilities().deviceId;
        this.frameRate = this.loaded_video.srcObject.getVideoTracks()[0].getCapabilities().frameRate;
        this.height = this.loaded_video.srcObject.getVideoTracks()[0].getCapabilities().height;
        this.width = this.loaded_video.srcObject.getVideoTracks()[0].getCapabilities().width;

        return [this.deviceId, this.frameRate, this.height, this.width ];    
    }
    
    canvas_mediStream(){
        const stream = this.canvasElement.captureStream(24);

        /*Adding stream to video for testing*/
        const test_video = document.querySelector('#testing');
       
       
       /*testing canvas_mediStream*/
        test_video.setAttribute('width', 960);
        test_video.setAttribute('height', 540);
        test_video.setAttribute('autoplay', 'true');
        
        test_video.onloadedmetadata = () => {
            test_video.width = test_video.videoWidth;
            test_video.height = test_video.videoHeight;
        };
        test_video.style.visibility = 'visible';
        test_video.srcObject = stream;
        this.canvas_stream = stream;
        return stream;

    }



    
    async virtualBackground_(prediction, canvasElement, videoElement, config){
 
        const {URL} = config;
        //new canvas
        const canvas = canvasElement;//cremaos un blank array para llenarlo
        const newImg = canvas.getContext('2d').createImageData(960, 540);//create blank new ImageData
        const newImgData = newImg.data;

        //prediction
        const {data:map} = prediction;
        const pixelLength = map.length;
        
        //Video Data
        const { data: videoData } = await this.videoImageData(960, 540, videoElement);
    
        //imageData
        const {data: imgData} = await this.getImageData(960, 540, URL);

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
            ] = !map[i]   ? [r, g, b, 255] : [
                                            videoData[i*4], 
                                            videoData[i*4 +1], 
                                            videoData[i*4 + 2], 
                                            0]
        }
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const {  backgroundBlurAmount, edgeBlurAmount, flipHorizontal } = config;
        bodyPix.drawMask(canvas, videoElement, newImg, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);    
    }




    async videoImageData (width, height, videoElement){
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


    async getImageData(width, height, URL){
        
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
        return ctx.getImageData(0, 0, width, height);   
    }

    async effect_blur_background(canvasElement, image, personSegmentation,  config){
        /*canvasElement where to draw the results*/
        /* config  = image--> imageData|HTMLimage|HTMLVideo, PersonSegmentation --> Prediction, edgeBlurAmount --> how many pixels to blur on the edge bettwen person and background, flipHorizontal --> flip image or not*/

        const {backgroundBlurAmount, edgeBlurAmount, flipHorizontal} = config; 
        await bodyPix.drawBokehEffect(canvasElement, image, personSegmentation, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
    }

    async virtual_background(canvasElement, videoElement, personSegmentation,  config){
        await this.virtualBackground_(personSegmentation, canvasElement, videoElement, config);
    }

     async blurBodyPart_(canvasElement, videoElement, personSegmentationParts,  config) {

        /*Reference of Body Parts*/
        const parts = {
            'left_face':0, 	
            'torso_front': 12,
            'right_face':1,
            'torso_back':13,
            'left_upper_arm_front':2,
            'left_upper_leg_front':14,
            'left_upper_arm_back':3,
            'left_upper_leg_back':15,
            'right_upper_arm_front': 4,
            'right_upper_leg_front':16,
            'right_upper_arm_back':5,
            'right_upper_leg_back':17,
            'left_lower_arm_front':8,
            'left_lower_leg_front':18,
            'left_lower_arm_back':7,
            'left_lower_leg_back':19,
            'right_lower_arm_front':8,
            'right_lower_leg_front':20,
            'right_lower_arm_back':9,
            'right_lower_leg_back':21,
            'left_hand':10,
            'left_foot': 22,
            'right_hand':11,
            'right_foot': 23
        }
    
        const {backgroundBlurAmount, edgeBlurAmount, flipHorizontal, faceBodyPartIdsToBlur} = config;

        await bodyPix.blurBodyPart(
            canvasElement, videoElement, personSegmentationParts, faceBodyPartIdsToBlur,
            backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
    }
     
    async grayScale(canvasElement, videoElement, personSegmentation, config){
        
      
        const {data:map} = personSegmentation;
        
        // Extracting video data
        const { data:imgData } = await this.videoImageData(960, 540, videoElement);

        //New canvas
        const canvas = canvasElement;
        /*Clean Canvas*/
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const newImg = canvas.getContext('2d').createImageData(canvas.width, canvas.height);
        const newImgData = newImg.data;
        //[r0, g0, b0, a0, r1, g1, b1, a1, ..., rn, gn, bn, an]
        for (let i = 0; i < map.length; i++) {
            //sacamos los r g b del video en si 
            const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
            
            // GrayScale Effect
            const gray = ((0.3 * r) + (0.59 * g) + (0.11 * b));
            [
                newImgData[i*4],
                newImgData[i*4+1],
                newImgData[i*4+2],
                newImgData[i*4+3]
            ] = !map[i] ? [gray, gray, gray, 255] : [r, g, b, a];
        }
        canvas.getContext('2d').putImageData(newImg, 0, 0);/*Paint the canvas*/
    }

    stopAnimationLoop(){
        /*Working*/
        this.stop = true;
        return this.stop;
    }

    async loop_(type_prediciton, config){
        //effect_function, parameters_function
 
        const prediction = await this.make_prediction_load();
        const loaded_video = this.loaded_video;
        const model_prediction = this.model_prediction;
        
        /*Add canvas to HTML*/
       VideoTracking.addVideo(document.querySelector('body'), this.canvasElement);// No es necesario anadir el HTML.... xd

        const loopping = async () =>{/*Loop for animation*/
           
            if (type_prediciton == 1){/*Blur Background - - PersonSegmentation*/
                /*Opciones sacar datos de la imagen / mandar directamente el HTML tag*/
                //const config = { flipHorizontal: this.flipHorizontal, internalResolution: this.internalResolution, segmentationThreshold: this.segmentationThreshold}
                const prediction_frame = await model_prediction.segmentPerson(loaded_video, config);
                this.effect_blur_background(this.canvasElement, this.loaded_video, prediction_frame,  config);
            }

            else if (type_prediciton === 2){/*Virtual Background - PersonSegmentation*/
                
                const prediction_frame = await model_prediction.segmentPerson(loaded_video, config);     
                this.virtual_background(this.canvasElement, this.loaded_video, prediction_frame,  config);
    
            }

            else if(type_prediciton === 3){/*Gray SCale - PersonSegmentation*/
                
                const prediction_frame = await model_prediction.segmentPerson(loaded_video, config);     
                this.grayScale(this.canvasElement, this.loaded_video, prediction_frame, config);
              
            }

            else if(type_prediciton === 4){/*Blur Body PARTS - PersonSegmentationPARTS*/
                const prediction_frameParts = await model_prediction.segmentPersonParts(loaded_video, config); 
                this.blurBodyPart_(this.canvasElement, this.loaded_video, prediction_frameParts, config);
            }
            /*Cleaning canvas*/
            

            if(this.stop){
                /*remove canvas If visible in the DOM*/
                this.canvasElement.remove();
                return;
            }
            window.requestAnimationFrame(loopping);
       }

    loopping();
    }

}

//Testing New Classes
//constructor(width, height, model_config, config_constrains, config_prediction )
/*Dimensions of the input video width, height*/
/* modelConfig = architecture: 'ResNet', 'mobileNetV1', outputStride: 8,16,32, multiplier: 1,0.75,0.50, quantBytes: 1,.75,.50 only mobile*/
/* config_constrains = audio: audio_config, video: video_config*/
/*config_prediction = flipHorizontal: true, internalResolution: 'high', segmentationThreshold: 0.7*/
/*config_prediction (additional for MultiPerson) = maxDetections: 10,scoreThreshold: 0.2, nmsRadius: 20, minKeypointScore: 0.3, refineSteps: 10*/

/* Podemos definir 3 categorias Small, Medium, High Para la configuracion del Modelo*/
const model_config_ultra_low = {architecture: "MobileNetV1", outputStride: 16, multiplier: 0.5, quantBytes: 2,}//0
const model_config_low = { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2}; //1
const model_config_medium = { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2}; //2
const model_config_high = { architecture: 'MobileNetV1', outputStride: 8, multiplier: 1, quantBytes: 2}; //3
const model_config_ultra = { architecture: 'ResNet50', outputStride: 16, quantBytes: 2}; //4


/*Configuraciones De Las Prediciones*/
const effect_config_precission_low = {  flipHorizontal: false, internalResolution: 'low', segmentationThreshold: 0.7}//0
const effect_config_precission_mid = {  flipHorizontal: false, internalResolution: 'medium', segmentationThreshold: 0.7}//1
const effect_config_precission_high = {  flipHorizontal: false, internalResolution: 'high', segmentationThreshold: 0.7}//2
const effect_config_precission_ultra = {  flipHorizontal: false, internalResolution: 'ultra', segmentationThreshold: 0.7}//3


/*Podemos Definir las dimensiones del video - ademas de cual camara pedir en moviles - dispositivo disponble en escritorio*/
/*Types of Devices and camera Selected*/
const mobile_front_camera = { audio: false, video: { facingMode: "user", width: { min: 640, ideal: 1280, max: 1920 }, height: { min: 480, ideal: 720, max: 1080 } }};//0
const mobile_rear_camera = { audio: false, video: { facingMode: { exact: "environment" }, width: { min: 640, ideal: 1280, max: 1920 }, height: { min: 480, ideal: 720, max: 1080 } }};//1
const desktop_selected_camera_device =  { audio: false, video: {deviceId: "0faf4c1dc3b35ff09df6a31cfb747fd82b1666fb9c6c9e0a39c7dd83c9311157" , width: { min: 640, ideal: 1280, max: 1920 }, height: { min: 480, ideal: 720, max: 1080 } }};//2
const desktop_select_camera_default = { audio: false, video: { width: { min: 640, ideal: 1280, max: 1920 }, height: { min: 480, ideal: 720, max: 1080 } }};//3


/*Configuracion del los Efectos*/
const config_effect_bokek = {backgroundBlurAmount: 20, edgeBlurAmount: 10};
const config_virtual_background = {backgroundBlurAmount: 1, edgeBlurAmount: 2.1,  URL: './js.jpg'};
const config_greyScale = {};
const config_blur_body_part = { backgroundBlurAmount: 30, edgeBlurAmount: 2.1, faceBodyPartIdsToBlur: [0, 1] };


/*Objecto Tracker*/
//width, height, model_config_number, config_constrains, config_prediction
const type_model_architecture = 1;
const effect_config_type = 2;
const type_of_device = 3;
const camera_id_str = 'testing';//When Passing type_of_device === 2


/*las dimensiones que se piden el el mediaStream*/
const video_configs = { audio: false, video: {width: 960, height: 540}}


const Tracking = new VideoTracking(type_model_architecture, effect_config_type, type_of_device);



//Tracking.predictionModel.w
/*Implementando 1...PersonSementation, Blur Background */

//Tracking.predictionModel.loop_(1,  config_effect_bokek);
//console.log(Tracking.predictionModel.stream_properties_mediaStream());
//const canvas_stream = Tracking.predictionModel.canvas_mediStream();
//console.log(canvas_stream);
//const streamProperties = Tracking.predictionModel.stream_properties(test_stream);
//console.log(streamProperties);

//Implementado 2... VirtualBackground- PersonSegmenttion, 
//Tracking.predictionModel.loop_(2,  config_virtual_background);
//const canvas_stream = Tracking.predictionModel.canvas_mediStream();
//console.log(canvas_stream);

//Implementado3  ... GrayScale Effect - Person Segmentation
//Tracking.predictionModel.loop_(3, config_greyScale);
//const canvas_stream = Tracking.predictionModel.canvas_mediStream();
//console.log(canvas_stream);


//Implementando4 ... Blur BodyParts - PersonSegmentationParts
Tracking.predictionModel.loop_(4, config_blur_body_part);
const canvas_stream = Tracking.predictionModel.canvas_mediStream();
console.log(canvas_stream);

btnPermissions = document.querySelector('.buttonpermision');
btnPermissions.addEventListener('click', () => {
    alert('Funciona');
});
/*Stop Anmation Loop*/
//Tracking.predictionModel.stopAnimationLoop();














































