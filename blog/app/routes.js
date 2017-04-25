import React from 'react'

import { Provider } from 'react-redux'
import store from './store/store'
import { browserHistory, IndexRoute, Route, Redirect,Router } from 'react-router'

import App from './containers/App'
import Defaulted from './components/Defaulted'
import Single from './components/Single'
import Sss from './components/Sss'
import Ss from './components/Ss'
import NotFound from './components/NotFound'
import Archive from './components/Archive'
import Write from './components/Write'

const router = (
    <Provider store={store}>
        
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Defaulted}/>
                <Route path="/single/:title/:day" component={Single}/>
                <Route path="/write" component={Write}/>
                <Route path="/archive" component={Archive}/>
                <Redirect from="/" to="/page/1"/>
            </Route>
            
        </Router>
    </Provider>
)


export default router