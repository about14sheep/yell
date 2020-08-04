import { combineReducers } from 'redux';

const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD': {
            return {
                ...state,
            }
        }
        default: return state;
    }
}

export default rootReducer;