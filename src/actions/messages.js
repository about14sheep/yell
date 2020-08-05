import { baseUrl } from "../config";

export const LOAD_MESSAGES = 'LOAD_MESSAGES';

const loadMessages = msgList => ({
    type: LOAD_MESSAGES,
    msgList
});

export const getPinMessages = id => async (dispatch) => {
    const res = await fetch(`${baseUrl}/messages/pins/${id}`)
    if (res.ok) {
        const msgList = await res.json();
        dispatch(loadMessages(msgList));
    }
}