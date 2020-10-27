import React from 'react'
import '../assets/css/Carousel.css'
import Background from '../assets/pictures/Background.png'
import Blur from '../assets/pictures/Blur.png'
import CaraBlur from '../assets/pictures/CaraBlur.png'
import GrayScale from '../assets/pictures/GrayScale.png'


const Carousel = () => {
    return (
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active ht">
                    <img src={Background} class="d-block w-100" alt="Effect Background"></img>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Virtual Background</h5>
                        <p>Replace the background with a default image.</p>
                    </div>
                </div>
                <div class="carousel-item ht">
                    <img src={Blur} class="d-block w-100" alt="Effect Blur"></img>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Effect Blur</h5>
                        <p>Blurs the background making it blurry.</p>
                    </div>
                </div>
                <div class="carousel-item ht">
                    <img src={CaraBlur} class="d-block w-100" alt="Effect CFace with Blur"></img>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Blur BodyPart</h5>
                        <p>Perform the Blur effect on a body part.</p>
                    </div>
                </div>
                <div class="carousel-item ht">
                    <img src={GrayScale} class="d-block w-100" alt="Effect Gray Scale"></img>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Effect Gray Scale</h5>
                        <p>Everything around the person changes color to grayscale.</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Carousel
