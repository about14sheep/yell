import { combineReducers } from 'redux';
import auth from './auth';
import pin from './pin';
import msg from './messages'

const rootReducer = combineReducers({
    auth,
    pin,
    msg,
})

export default rootReducer;