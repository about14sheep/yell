import { SET_TOKEN, REMOVE_TOKEN, SET_USER_NAME, REMOVE_USER_NAME } from '../actions/authentication';

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            }
        }

        case SET_USER_NAME: {
            return {
                ...state,
                username: action.username
            }
        }

        case REMOVE_TOKEN: {
            const nextState = { ...state };
            delete nextState.token;
            return nextState;
        }

        case REMOVE_USER_NAME: {
            const nextState = { ...state };
            delete nextState.username;
            return nextState;
        }

        default: return state
    }
}

export default authReducer;