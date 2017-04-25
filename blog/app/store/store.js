
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/index'

import thunk from 'redux-thunk'

import { loginUserSuccess, logout, testLogin, loginUser, checkAuth } from '../actions/actions'
let store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store