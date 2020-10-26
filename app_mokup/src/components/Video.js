import React from 'react';
import '../assets/css/Video.css'
import ButtonPermision from './ButtonPermision'

const Video = () => {
    return (
        <div class="d-flex justify-content-center align-items-center">
            <div id="replaceCam" class="my-3 video">
                <p class="text-white pt-5 lead">Tribe needs your permission to access the camera and microphone.</p>
                <div><ButtonPermision /></div>
            </div>
        </div>
    );
}

export default Video