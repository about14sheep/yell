import { UPDATE_MESSAGES, LOAD_USERS } from '../actions/messages';

const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_MESSAGES: {
            return state.concat([action.msg])
        }

        case LOAD_USERS: {
            return state.concat([action.userList])
        }

        default: return state
    }

}

export default messagesReducer