
import {combineReducers} from 'redux'
import auth from './auth'
import check from './check'

export default combineReducers({
    auth,
    check
})
