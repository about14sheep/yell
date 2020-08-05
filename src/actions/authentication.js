import { baseUrl } from '../config';

const TOKEN_KEY = 'yell/authentication/token'
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const removeToken = _ => ({
    type: REMOVE_TOKEN,
});

export const setToken = token => ({
    type: SET_TOKEN,
    token,
})

export const loadToken = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
        dispatch(setToken(token))
    }
}

export const login = (email, password) => async dispatch => {
    const res = await fetch(`${baseUrl}/session`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
        const { token } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        dispatch(setToken(token))
    }
}

export const signup = (email, password, username) => async dispatch => {
    const res = await fetch(`${baseUrl}/users`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username })
    })

    if (res.ok) {
        const { token } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        dispatch(setToken(token))
    }
}

export const logout = () => async (dispatch, getState) => {
    const { auth: { token } } = getState()
    const res = await fetch(`${baseUrl}/session`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken());
    }
}