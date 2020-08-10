import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPin } from '../actions/pins';
import { Link, Route } from 'react-router-dom';
import PinChat from './PinChat';

const PinForm = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const userId = useSelector(state => state.auth.id);
    const geoLoc = useSelector(state => state.pin.geoLoc);
    const currentPin = useSelector(state => state.pin.current)

    const updateValue = e => setInputValue(e.target.value)

    const goToCurrentPin = _ => (
        <div>
            <p>There is already a chat at your location!</p>
            <Link to={{ pathname: `/pins/${currentPin.id}`, title: `${currentPin.title}` }} >Take me there!</Link>
            <Route path='/pins/:id' render={props => <PinChat {...props} />} />
        </div>
    )

    const dropPin = e => {
        e.preventDefault();
        dispatch(postPin(inputValue, geoLoc, userId))
    }

    if (currentPin) {
        return goToCurrentPin()
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={dropPin}>
                    <input type="text" value={inputValue} placeholder={'got words?'} onChange={updateValue} />
                    <button type="submit">yell</button>
                </form>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}

export default PinForm;