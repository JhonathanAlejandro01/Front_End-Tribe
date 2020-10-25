import React from 'react'
import '../assets/css/Intro.css'
import { Link } from 'react-router-dom'




const Intro = () => {
    return (
        <div className="container-fluid intro">
            <div className="row">
                <div className="col-6">
                    <h1 className="">Effect Virtual Background</h1>
                    <Link to="/app" class="btn btn-primary">Lest's Go!</Link>
                </div>
                <div className="col-6">
                    <p>colocar imagen aqui.
                    colocar imagen aqui.
                    colocar imagen aqui.
                    colocar imagen aqui.
                    colocar imagen aqui.
                    colocar imagen aqui.
                    colocar imagen aqui.
                    colocar imagen aqui.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Intro
