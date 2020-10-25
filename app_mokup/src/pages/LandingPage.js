import React from 'react'
import Intro from '../components/Intro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../pages/App'

const LandingPage = () => {
    return (
        <Router>
            <Switch>
                <Route path="/App">
                    <App />
                </Route>
                <Route path="/">
                    <Intro />
                </Route>
            </Switch>
        </Router>
    )
}

export default LandingPage
