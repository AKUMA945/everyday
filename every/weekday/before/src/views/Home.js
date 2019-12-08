import React, { Component } from 'react'
import {NavLink} from "react-router-dom"
import RouterView from "../router/RouterView"

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <header>

                </header>
                <main>
                    <RouterView routes={this.props.routes} />
                </main>
                <footer>
                    <NavLink to="/home/circle">圈子</NavLink>
                    <NavLink to="/home/mine">我的</NavLink>
                </footer>
            </div>
        )
    }
}
