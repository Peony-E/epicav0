// 12.19
import {
    CHECK_AUTHENTICATED_REQUEST,
    CHECK_AUTHENTICATED_MATCHED
} from '../constants/actionType'

const initialState = {
    isAuthenticating: false,
    isAuthenticated: false
}

const check = (state = initialState, action) => {
    switch(action.type){
        case CHECK_AUTHENTICATED_REQUEST:
            return {
                ...state,
                isAuthenticating: true
            }
        case CHECK_AUTHENTICATED_MATCHED:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: action.isAuthenticated
            }
        default:
            return {
                ...state,
                state
            }
    }
}
export default check