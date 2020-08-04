const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD': {
            return {
                ...state,
                list: action.list
            }
        }

        case 'SET_CURRENT': {
            return {
                ...state,
                current: action.current,
            }
        }
        default: return state;
    }
}

export default rootReducer;