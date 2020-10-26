import React from 'react'
import Intro from '../components/Intro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../pages/App'
import Feature from '../components/Feature'
import About from '../components/About'

const LandingPage = () => {
    return (
        <Router>
            <Switch>
                <Route path="/App">
                    <App />
                </Route>
                <Route path="/">
                    <Intro />
                    <Feature />
                    <About />
                </Route>
            </Switch>
        </Router>
    )
}

export default LandingPage
