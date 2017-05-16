import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    CHECK_AUTHENTICATED_REQUEST,
    CHECK_AUTHENTICATED_MATCHED,
    TITLES_GET_REQUEST,
    TITLES_GET_SUCCESS,
    TITLES_GET_FAILURE,
    TAGS_REQUEST,
    TAGS_SUCCESS,
    TAGS_FAILURE,
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
    SINGLE_REQUEST,
    SINGLE_SUCCESS,
    SINGLE_FAILURE,
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_FAILURE,
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    HOME,
    ARCHIVE,
    TAGS,
    SEARCH
} from '../constants/actionType'
import { checkHttpStatus } from '../utils' import jwtDecode from 'jwt-decode'
import fetch from 'isomorphic-fetch'

export const loginUserRequest = () =>{
    return {
        type: LOGIN_USER_REQUEST
    }
}
export const loginUserSuccess = (token) =>{
    localStorage.setItem('token',token)
    return {
        type: LOGIN_USER_SUCCESS,
            payload: {
            token: token
        }
    }
}


export const loginUserFailure = (error) => {
    localStorage.removeItem('token')
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            //是因为在checkHttpStatus下else下的error要throw出来的，所以紧接其后，这里应该是用error.res.来衔接吧，这么认为恰当不。
            status: error.status,
            statusText: error.statusText
        }
    }

}


export const loginUser = (token) => {
    return dispatch => {
        dispatch(loginUserRequest())

        fetch('api/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({token:token})
        })
            .then(checkHttpStatus)
            .then(res => res.json())
            .then( res => {
                try {
                    dispatch(loginUserSuccess(token))
                }catch (e){
                    dispatch(loginUserFailure({
                        res:{
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }))
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error))
            })
            dispatch(loginUserSuccess(token))
    }
}




export const logout = () =>{
    localStorage.removeItem('token')
    return {
        type: LOGOUT_USER
    }
}

export const logoutAndRedirect = () => {
    return (dispatch, state) => {
        dispatch(logout())
    }
}



export const checkAuthenticatedRequest = () => {
    return {
        type: CHECK_AUTHENTICATED_REQUEST
    }
}

export const checkAuthenticatedMatched = (matched) => {
    return {
        type: CHECK_AUTHENTICATED_MATCHED,
        isAuthenticated: matched,
    }
}


export const checkAuth =() => {
    return dispatch => {
        dispatch(checkAuthenticatedRequest())
        fetch("api/check",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({token: localStorage.token})
        })
            .then(checkHttpStatus)
            .then(res => res.json())
            .then(res => {
                if(res.match){
                    dispatch(checkAuthenticatedMatched(true))
                }else{
                    dispatch(checkAuthenticatedMatched(false))
                }
            })
            dispatch(checkAuthenticatedMatched(true))
    }
}

