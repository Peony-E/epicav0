import React, { Component } from 'react'
import style from './style.css'

export default class About extends Component{
    constructor(props){
        super(props)
    }
    onQuit(){
        document.getElementsByTagName('body')[0].style.overflow = ""
        this.props.callback()
    }
    render(){
        return (
            <div className={style.about}>
                <div>
                    <h2>About页面</h2>
                    <p>weibo: <a href="/">harry</a></p>
                    <p>github: <a href="" target="_blank"></a></p>
                    <p>email: buyeril@gmail.com</p>
                    <p>
                        This is a SPA blog built by express and react. For more detail, view the code <a href="/">here</a>.
                        <br/>
                    </p>
                    <button onClick={this.onQuit.bind(this)}>BACK</button>
                </div>
            </div>
        )
    }
}

About.PropTypes = {
    callback: React.PropTypes.func.isRequired
}