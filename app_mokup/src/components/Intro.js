import React from 'react'
import '../assets/css/Intro.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'



const Intro = () => {
    return (
        <Router>
            <div className="container intro">
                <div className="row">
                    <div className="col-6">
                        <h1 className="">Effect Virtual Background</h1>
                        <Link to="/app" class="btn btn-primary" role="button">Lest's Go!</Link>
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
        </Router>
    )
}

export default Intro
