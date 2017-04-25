import React, { Component } from 'react'

import About from './About'
import style from './style.css'
import { Link } from 'react-router'

export default class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            about: false,
            isAuthenticated: this.props.auth.isAuthenticated,
            token: this.props.auth.token,
            status: this.props.auth.status,
            show: {
                display: "none"
            },
            text: "",
            shouldBeLogout: false,
            isShown: false
        }
    }
    componentDidMount(){
        if(!!localStorage.token){
            this.props.login(localStorage.token)
            this.props.checkAuth()
        }

    }


    onAbout(){
        this.setState({
            about: true
        })
    }
    onAboutChild(){
        this.setState({
            about: false
        })
    }
    onLogoutHandler(e){

        this.setState({
            isAuthenticated: false,
            shouldBeLogout: true
        }) 

        this.props.checkAuthenticatedMatched(false)
        this.props.logoutAndRedirect()
    }
    onLoginHandler(e){
        e.preventDefault()
        if(this.state.isShown){
            this.setState({
                isShown: false,
                show: {
                    display: "none"
                }
            })
        }else{
            this.setState({
                isShown: true,
                show: {
                    display: "flex"
                }
            })
        }
    }
    onPostHandler(e){
        if(e.which === 13 && this.state.text != ""){
            const password = this.state.text
            this.props.login(password)
            this.props.checkAuth()
            this.setState({
                text: "",
                isAuthenticated: true, 
                shouldBeLogout: false,
                isShown: false,
                show: {
                    display: "none"
                }
            })
        }

    }
    componentWillReceiveProps(nextProps){
        this.setState({
            isAuthenticated: nextProps.check.isAuthenticated
        })

        if(nextProps.auth.isAuthenticated){
            this.setState({
                isAuthenticated: true
            })
        }
    }

    onChangeHandler(e){
        this.setState({
            text: e.target.value
        })
    }

    render(){
        return (
            <div>
                {this.state.about?
                <About callback={this.onAboutChild.bind(this)}/>:""}
                <ul>
                    {this.state.isAuthenticated?<li>write</li>:<li onClick={this.onAbout.bind(this)}>about</li>}
                    {this.state.isAuthenticated?<li onClick={this.onLogoutHandler.bind(this)}>logout</li>:<li onClick={this.onLoginHandler.bind(this)}>login</li>}
                </ul>
                <div style={this.state.show}>{/*<form action="/api/login" method="post">*/}{/*12.31 添加试试的，可以去掉因为这里暂时不需要*/}
                    <label htmlFor="">disfsojds</label>
                    <input type="text" onChange={this.onChangeHandler.bind(this)} onKeyDown={this.onPostHandler.bind(this)}/>{/*</form>*/}
                </div>
            </div>
        )
    }


}

Header.propTypes = {
    auth: React.PropTypes.object.isRequired,
    check: React.PropTypes.object.isRequired,
    login: React.PropTypes.func.isRequired,
    logoutAndRedirect: React.PropTypes.func.isRequired,
    checkAuth: React.PropTypes.func.isRequired,
    checkAuthenticatedMatched: React.PropTypes.func.isRequired,
    location: React.PropTypes.string.isRequired
}


