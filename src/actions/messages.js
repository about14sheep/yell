import { baseUrl } from "../config";

export const LOAD_USERS = 'LOAD_USERS';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';

export const loadUsers = userList => ({
    type: LOAD_USERS,
    userList
});

export const getPinMessages = id => async (dispatch) => {
    const res = await fetch(`${baseUrl}/messages/pins/${id}`)
    if (res.ok) {
        const list = await res.json();
        const userList = [...new Set(list.map(msg => msg.User.username))]
        await dispatch(loadUsers({
            pinId: id,
            users: userList
        }))
    }
}

export const addMessage = (msg) => ({
    type: UPDATE_MESSAGES,
    msg
})


export const postMessage = (pinId, userId, messageText) => async dispatch => {
    try {
        const res = await fetch(`${baseUrl}/messages/pins/${pinId}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pinId, userId, messageText })
        })
        if (res.ok) {
            console.log('ok')
        }
    } catch (e) {
        console.log(e)
    }

}