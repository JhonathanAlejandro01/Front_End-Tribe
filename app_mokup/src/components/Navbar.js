import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Navbar.css'



const Navbar = () => {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark nav-bg">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto" id="navacti">
          <a className="nav-link" href="#home">Home</a>
          <a className="nav-link" href="#feature">Features</a>
          <a className="nav-link" href="#about">About</a>
        </div>
        <div>
          <Link to="/app" class="btn btn-danger">App</Link>
        </div>
      </div>
      </nav>
    )
}

export default Navbar
