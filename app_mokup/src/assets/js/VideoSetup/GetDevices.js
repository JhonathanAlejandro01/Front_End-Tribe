const getDevices = async () => {
    console.log('entro');
    //que el user agent sea compatible con mediaDevices
    if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
     return [];
    }
    //ahora miramos si  que devices ofrece el USER
    //alertPrompt('Lo soporta');
    const devices = await navigator.mediaDevices.enumerateDevices();
  
    // Por ahora me interesa solo el video-Label-deviceId
    const VideoDevices = devices.filter( device  => device.kind === 'videoinput');
  
    //si no retornar error si no tiene
    return VideoDevices
  
  }
  
  export default getDevices;