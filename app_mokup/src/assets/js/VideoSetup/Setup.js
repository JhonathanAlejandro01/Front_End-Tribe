
const setVideo = async (video) => {

    const config  = {
      audio: false, 
      video: true 
    };
  
    const stream = await navigator.mediaDevices.getUserMedia(config);
    video.srcObject = stream;
  
    //retornamos promesa para forzar que espere y retorne
    return PromiseCreator(video);
  }
  
  //ponemos el video con sus valores
  const PromiseCreator = (video) => {
    return new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        resolve(video);
      };
    });
  }

  export default setVideo;

  export const addVideo = (HTMLelement, video) =>{
    HTMLelement.appendChild(video);
  }