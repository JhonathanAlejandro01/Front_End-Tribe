import setVideo, {} from './Setup.js';

async function loadVideo(video, tracker) {
    tracker.video = video;//setvideo attr in singleton
    try {
      await setVideo(tracker.video);
    } catch (e) {
       throw e;
    }
    //"comenzamos" el stream para que se carge y podamos a empezar a aplica prediciones
    //await tracker.video.play();//starts video 
  }
  export default loadVideo;