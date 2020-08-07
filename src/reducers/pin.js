import { LOAD, SET_CURRENT, SET_GEOLOC } from '../actions/pins';


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

        case SET_GEOLOC: {
            return {
                ...state,
                geoLoc: action.geoLoc,
            }
        }

        default: return state;
    }
}

export default pinReducer;