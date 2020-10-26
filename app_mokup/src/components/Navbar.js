import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav mr-auto">
      <a className="nav-link active" data-scroll href="#">Home</a>
      <a className="nav-link" data-scroll href="#">Features</a>
      <a className="nav-link" data-scroll href="#">About</a>
    </div>
    <div>
    <Link to="/app" class="btn btn-primary">App</Link>
    </div>
  </div>
</nav>
    )
}

export default Navbar
