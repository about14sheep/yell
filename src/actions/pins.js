const load = list => ({
    type: 'LOAD',
    list,
})

export const getPins = () => async (dispatch) => {
    const res = await fetch('http://localhost:8080/pins/1')
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list))
        console.log(list)
    }
}