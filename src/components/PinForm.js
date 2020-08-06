import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPin } from '../actions/pins';

const PinForm = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const userId = useSelector(state => state.auth.id);
    const geoLoc = useSelector(state => state.pin.geoLoc);

    const updateValue = e => setInputValue(e.target.value)

    const dropPin = e => {
        e.preventDefault();
        dispatch(postPin(inputValue, geoLoc, userId))
    }

    return (
        <div>
            <form onSubmit={dropPin}>
                <input type="text" value={inputValue} placeholder={'got words?'} onChange={updateValue} />
                <button type="submit">yell</button>
            </form>
        </div>
    )
}

export default PinForm;