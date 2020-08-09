import { baseUrl } from '../config';

const TOKEN_KEY = 'yell/authentication/token'
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const REMOVE_USER_ID = 'REMOVE_USER_ID';
export const SET_USER_NAME = 'SET_USER_NAME';
export const REMOVE_USER_NAME = 'REMOVE_USER_NAME'

export const removeToken = _ => ({
    type: REMOVE_TOKEN,
});

export const setUserId = id => ({
    type: SET_USER_ID,
    id
})

export const removeUserId = _ => ({
    type: REMOVE_USER_ID
})

export const removeUsername = _ => ({
    type: REMOVE_USER_NAME,
})

export const setUsername = username => ({
    type: SET_USER_NAME,
    username,
})

export const setToken = token => ({
    type: SET_TOKEN,
    token,
})

export const loadUserId = () => async dispatch => {
    const id = window.localStorage.getItem('id')
    if (id) {
        dispatch(setUserId(id))
    }
}

export const loadUsername = () => async dispatch => {
    const name = window.localStorage.getItem('username');
    if (name) {
        dispatch(setUsername(name))
    }
}

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
        const { token, user } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem('username', user.username)
        window.localStorage.setItem('id', user.id)
        dispatch(setUserId(user.id))
        dispatch(setUsername(user.username))
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
        const { token, user } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem('username', user.username)
        window.localStorage.setItem('id', user.id)
        dispatch(setUserId(user.id))
        dispatch(setUsername(user.username))
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
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('id')
        dispatch(removeUserId());
        dispatch(removeUsername())
        dispatch(removeToken());
    }
}