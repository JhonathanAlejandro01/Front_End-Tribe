function createVideo(){
    const video = document.createElement('video');
    video.setAttribute('autoplay','false');
    //video.setAttribute('playsinline', 'false');
    //video.setAttribute('controls', 'false');
    video.dataset.videoid = 1;
    //video.style.visibility = 'visible';
    video.style.display = 'none';
    return video;
}

export default createVideo;