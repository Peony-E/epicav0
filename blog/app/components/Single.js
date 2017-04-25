import React, { Component } from 'react'

import style from './style.css'

export default class Single extends Component{
    render(){
        return(
            <div className={style.single}>Single
                <div>
                    <h1>review here title</h1>
                    <span>time</span>
                    <div>tags</div>
                    <a href="">author</a>
                    <p>content</p>
                </div>
                <div>search</div>
                <div>
                    <span>edit</span>
                    <span>delete</span>
                </div>
                <div>
                    <span>prev</span>
                    <span>next</span>
                </div>
                <div>
                    post view here
                    <h1>title</h1>
                    <span>time</span>
                    <div>tags</div>
                    <a href="">author</a>
                    <p>content</p>
                    <p>preview</p>
                    <p>post it</p>
                </div>
            </div>
        )
    }
}