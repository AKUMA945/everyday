import React, { Component } from 'react'
import axios from "axios"

export default class Circle extends Component {

    state={
        data:[]
    }
    
    componentDidMount(){
        axios.get("/api/list").then(res=>{
            if(res.data.code===1){
                 this.setState({
                 data:res.data.data
                })
            }
        })
    }

    render() {
        let {data} = this.state
        console.log(data)
        return (
            <div>
                圈子
            </div>
        )
    }

}
