import React from 'react'
import '../assets/css/Intro.css'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Grupo from '../assets/pictures/Grupo.jpg'




const Intro = () => {
    return (
        <>
        <Navbar />
        <div className="container-fluid intro">
            <div className="row  align-items-center justify-content-around">
                <div className="col-6 justify-content-center">
                    <h1 className="titulo display-3">Effect Virtual Background</h1>
                    <Link to="/app" class="btn btn-danger shadow ml-5 mt-5 p-3">Lest's Go!</Link>
                </div>
                <div className="col-6">
                    <img src={Grupo} alt="Group" class="img-thumbnail"></img>
                </div>
            </div>
        </div>
        </>
    )
}

export default Intro
