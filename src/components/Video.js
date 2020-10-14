import React from 'react';
import '../assets/css/Video.css'
import ButtonPermision from './ButtonPermision'

const Video = () => {
    return (
        <div class="container text-center align-middle my-3 video">
            <p class="text-white text-center mt-4">Tribe needs your permission to access the camera and microphone.</p>
            <ButtonPermision />
            <video>
            </video>
        </div>
    );
}

export default Video