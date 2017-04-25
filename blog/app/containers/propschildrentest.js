import React, { Component } from 'react'
export default class PTest extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                {React.cloneElement(this.props.kids, this.props)}
            </div>
        )
    }
}