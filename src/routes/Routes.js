import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import App from '../pages/App'
import AddUser from '../pages/AddUser'

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path='/' exact component={App} />
                    <Route path='/add' exact component={AddUser} />
                    <Route path='/edit/:id' exact component={AddUser} />
                </Switch>
            </Router>
        )
    }
}
