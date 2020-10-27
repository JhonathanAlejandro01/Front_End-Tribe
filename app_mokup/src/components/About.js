import React from 'react'
import Cards from './Cards'
import Information from './Information'
import '../assets/css/About.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const About = () => {
    return (
        <div className="mt-5" id="about">
            <Information />
            <Cards />
            <div className="container">
            <a href="https://github.com/hectorlopezv" target="blank">
                <button type="button" className="btn btn-danger btn-lg btn-block my-4 btnr"><FontAwesomeIcon icon={faGithub} className="mx-2" />Repositorie</button>
            </a>
            </div>
        </div>
    )
}

export default About
