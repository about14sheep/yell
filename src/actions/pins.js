export const LOAD = 'LOAD';
export const SET_CURRENT = 'SET_CURRENT';

const load = list => ({
    type: LOAD,
    list,
})

const setCurrent = current => ({
    type: SET_CURRENT,
    current,
})



export const getPins = () => async (dispatch) => {
    const res = await fetch('http://localhost:8080/pins')
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list))
    }
}

export const getPinChat = id => async (dispatch, getState) => {
    const res = await fetch(`http://localhost:8080/pins/${id}`)
    if (res.ok) {
        const pin = await res.json()
        dispatch(setCurrent(pin))
    }
}