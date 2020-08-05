import { LOAD, SET_CURRENT } from '../actions/pins';

const pinReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                list: action.list
            }
        }

        case SET_CURRENT: {
            return {
                ...state,
                current: action.current,
            }
        }

        default: return state;
    }
}

export default pinReducer;