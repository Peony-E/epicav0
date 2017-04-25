import React, { Component } from 'react'
import { Link } from 'react-router'

import Header from '../components/Header'
import Footer from '../components/Footer'

import * as actions from '../actions/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class App extends Component{
    componentDidMount(){
    }
    render(){


        return (
            <div>App
                {React.cloneElement(this.props.children, this.props)}

                <Header auth={this.props.auth}
                        check={this.props.check}
                        login={this.props.actions.loginUser}
                        logoutAndRedirect={this.props.actions.logoutAndRedirect}
                        checkAuth={this.props.actions.checkAuth}
                        checkAuthenticatedMatched={this.props.actions.checkAuthenticatedMatched}
                        location={this.props.location.pathname} />
                <ul>
                    <li><Link to="/write">write</Link></li>
                    <li><Link to="/">Home</Link></li>
                </ul>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: {
            token: state.auth.token,
            isAuthenticated: state.auth.isAuthenticated,
            isAuthenticating: state.auth.isAuthenticating,
            status: state.auth.status,
            statusText: state.auth.statusText
        },
        check: {
            isAuthenticating: state.check.isAuthenticating,
            isAuthenticated: state.check.isAuthenticated
        }
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


// export default App
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

