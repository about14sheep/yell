import { SET_TOKEN, REMOVE_TOKEN, SET_USER_ID, REMOVE_USER_ID } from '../actions/authentication';

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            }
        }

        case SET_USER_ID: {
            return {
                ...state,
                id: action.id
            }
        }

        case REMOVE_TOKEN: {
            const nextState = { ...state };
            delete nextState.token;
            return nextState;
        }

        case REMOVE_USER_ID: {
            const nextState = { ...state };
            delete nextState.id;
            return nextState;
        }

        default: return state
    }
}

export default authReducer;