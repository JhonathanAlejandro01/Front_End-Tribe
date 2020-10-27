import React from 'react'
import '../assets/css/Cards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cara_Hector from '../assets/pictures/Cara_Hector.jpeg'
import Fondo_Hector from '../assets/pictures/Fondo_Hector.jpeg'
import Cara_Jhonathan from '../assets/pictures/Cara_Jhonathan.jpg'
import Fondo_Jhonathan from '../assets/pictures/Fondo_Jhonathan.png'
import Cara_David from '../assets/pictures/Cara_David.jpeg'
import Fondo_David from '../assets/pictures/Fondo_David.jpeg'
import Fondo_Hugo from '../assets/pictures/Fondo_Hugo.jpeg'
import Cara_Hugo from '../assets/pictures/Cara_Hugo.jpeg'
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

const Cards = () => {
    return (
        <div class="container">
            <div class="card-deck">
                <div class="card">
                    <img class="card-img-top img-fluid" src={Fondo_Hector} alt="Cover page"></img>
                    <div class="text-center">
                        <img src={Cara_Hector} alt="Miniature Hector" class="img-fluid yoimagen rounded-circle" height="100px" width="100px"></img>
                    </div>
                    <div class="card-block">
                        <h4 class="card-title text-center">Machine Learning</h4>
                    </div>
                    <div class="card-footer text-center">
                        <a href="https://www.linkedin.com/in/hector-lopez-258097137/" target="blank"><FontAwesomeIcon icon={faLinkedin} size="3x" className="mx-2" /></a>
                        <a href="https://github.com/hectorlopezv" target="blank"><FontAwesomeIcon icon={faGithub} size="3x" className="mx-2" /></a>
                        <a href="https://twitter.com/CurlyGalactic" target="blank"><FontAwesomeIcon icon={faTwitter} size="3x" className="mx-2" /></a>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top img-fluid" src={Fondo_Jhonathan} alt="Cover page"></img>
                    <div class="text-center">
                        <img src={Cara_Jhonathan} alt="Miniature Jhonathan" class="img-fluid yoimagen rounded-circle" height="100px" width="100px"></img>
                    </div>
                    <div class="card-block">
                        <h4 class="card-title text-center">Front End</h4>
                    </div>
                    <div class="card-footer text-center">
                        <a href="https://www.linkedin.com/in/jhonathan-alejandro-2021331a2" target="blank"><FontAwesomeIcon icon={faLinkedin} size="3x" className="mx-2" /></a>
                        <a href="https://github.com/JhonathanAlejandro01" target="blank"><FontAwesomeIcon icon={faGithub} size="3x" className="mx-2" /></a>
                        <a href="https://twitter.com/Alejandro_Angar" target="blank"><FontAwesomeIcon icon={faTwitter} size="3x" className="mx-2" /></a>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top img-fluid" src={Fondo_David} alt="Cover page"></img>
                    <div class="text-center">
                        <img src={Cara_David} alt="Miniature David" class="img-fluid yoimagen rounded-circle" height="100px" width="100px"></img>
                    </div>
                    <div class="card-block">
                        <h4 class="card-title text-center">QA Enginner</h4>
                    </div>
                    <div class="card-footer text-center">
                        <a href="https://www.linkedin.com/in/david-alfredo-de-la-hoz-fernandez-570981162/" target="blank"><FontAwesomeIcon icon={faLinkedin} size="3x" className="mx-2" /></a>
                        <a href="https://github.com/daviddlhz" target="blank"><FontAwesomeIcon icon={faGithub} size="3x" className="mx-2" /></a>
                        <a href="https://twitter.com/DavidDlhz" target="blank"><FontAwesomeIcon icon={faTwitter} size="3x" className="mx-2" /></a>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top img-fluid" src={Fondo_Hugo} alt="Cover page"></img>
                    <div class="text-center">
                        <img src={Cara_Hugo} alt="Miniature David" class="img-fluid yoimagen rounded-circle" height="100px" width="100px"></img>
                    </div>
                    <div class="card-block">
                        <h4 class="card-title text-center">Front End</h4>
                    </div>
                    <div class="card-footer text-center">
                        <a href="https://www.linkedin.com/in/hugo-santiago-330b30145/" target="blank"><FontAwesomeIcon icon={faLinkedin} size="3x" className="mx-2" /></a>
                        <a href="https://github.com/hfsantiago" target="blank"><FontAwesomeIcon icon={faGithub} size="3x" className="mx-2" /></a>
                        <a href="https://twitter.com/hsant1ago" target="blank"><FontAwesomeIcon icon={faTwitter} size="3x" className="mx-2" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards
