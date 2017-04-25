import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../constants/actionType'


const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    status: null,
    statusText: null
}

const reducers = (state=initialState, action) => {
    switch (action.type){
        case LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                "isAuthenticating": true,
                "token": null
            })
        case LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                "isAuthenticated": false,
                "isAuthenticating": false,
                "token": null,
                "userName": null,
                "statusText": `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
            })
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                "isAuthenticating": false,
                "isAuthenticated" :true,
                "token":action.payload.token,
                "statusText": 'You have been successfully logged in.'
            })
        case LOGOUT_USER:
            return {
                ...state,
                "isAuthenticated": false,
                "isAuthenticating": false,
                "token": null,
                "userName": null,
                "statusText": 'You have been logged out.'
            }
        default:
            return Object.assign({}, state)
    }
}

export default reducers