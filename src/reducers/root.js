import { combineReducers } from 'redux';
import auth from './auth';
import pin from './pin';

const rootReducer = combineReducers({
    auth,
    pin,
})

export default rootReducer;