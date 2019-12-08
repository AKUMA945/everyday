import React, { Component } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"

export default class RouterView extends Component {
    render() {
        let {routes} = this.props
        let redirect = routes.filter(item=>item.redirect)
        routes = routes.filter(item=>!item.redirect)
        return (
            <Switch>
                {
                    routes.map((v,i)=>(
                        <Route key={i}
                               path={v.path}
                               render={(props=>{
                                   if(v.children){
                                       return <v.component routes={v.children} {...props}></v.component>
                                   }else{
                                       return <v.component {...props}></v.component>
                                   }
                               })}></Route>
                    ))
                }
                {
                    redirect.map((v,i)=>(<Redirect key={i} from={v.path} to={v.redirect}/>))
                }

            </Switch>
        )
    }
}
