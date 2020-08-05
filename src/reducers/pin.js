import { LOAD, SET_CURRENT } from '../actions/pins';
import { LOAD_MESSAGES } from '../actions/messages';

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

        case LOAD_MESSAGES: {
            return {
                ...state,
                msgList: action.msgList,
            }
        }

        default: return state;
    }
}

export default pinReducer;