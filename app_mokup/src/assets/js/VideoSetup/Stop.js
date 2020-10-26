const stopVideo = () => {
    //solo si srcObject esta definido borra sus tracks.... y exista el video element..
    if(video && video.srcObject)
    {
      console.log('papi');
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
  
      video.srcObject = null;
    }
  }