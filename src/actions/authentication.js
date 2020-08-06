import { baseUrl } from '../config';
import { getGeoLoc } from './pins';

const TOKEN_KEY = 'yell/authentication/token'
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const REMOVE_USER_ID = 'REMOVE_USER_ID'

export const removeToken = _ => ({
    type: REMOVE_TOKEN,
});

export const removeUserId = _ => ({
    type: REMOVE_USER_ID,
})

export const setUserId = id => ({
    type: SET_USER_ID,
    id,
})

export const setToken = token => ({
    type: SET_TOKEN,
    token,
})

export const loadUserId = () => async dispatch => {
    const id = window.localStorage.getItem('userId');
    if (id) {
        dispatch(setUserId(id))
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
        window.localStorage.setItem('userId', user.id)
        dispatch(setUserId(user.id))
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
        window.localStorage.setItem('userId', user.id)
        dispatch(setUserId(user.id))
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
        window.localStorage.removeItem('userId');
        dispatch(removeUserId())
        dispatch(removeToken());
    }
}