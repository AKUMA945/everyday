import React, { Component } from 'react'
import './App.scss';
import RouterView from "./router/RouterView"
import routes from './router/router-config'
import {BrowserRouter as Router} from "react-router-dom"

export default class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Router>
            <RouterView routes={routes} />
        </Router>
      </div>
    )
  }
}
