import { baseUrl } from '../config';

export const LOAD = 'LOAD';
export const SET_CURRENT = 'SET_CURRENT';
export const SET_GEOLOC = 'SET_GEOLOC';

const load = list => ({
    type: LOAD,
    list,
})

const setGeoLoc = geoLoc => ({
    type: SET_GEOLOC,
    geoLoc
})

const setCurrent = current => ({
    type: SET_CURRENT,
    current,
})

export const getPins = () => async (dispatch) => {
    const res = await fetch(`${baseUrl}/pins`)
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list))
    }
}

export const getGeoLoc = () => async (dispatch) => {
    if (!'geolocation' in navigator) {
        console.log('cant get location')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        return formatCoords(dispatch, position.coords.latitude, position.coords.longitude)
    })

}
const formatCoords = (dispatch, latitude, longitude) => dispatch(setGeoLoc(`ST_MakePoint(${latitude}, ${longitude})`))

export const postPin = (title, geoLoc, ownerId) => async _ => {
    console.log(title, geoLoc, ownerId)
    const res = await fetch(`${baseUrl}/pins`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, geoLoc, ownerId })
    })
    if (res.ok) {
        console.log('ok')
    }
}



export const getPinChat = id => async (dispatch, getState) => {
    const res = await fetch(`${baseUrl}/pins/${id}`)
    if (res.ok) {
        const pin = await res.json()
        dispatch(setCurrent(pin))
    }
}