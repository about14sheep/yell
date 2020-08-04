import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


import { getPins } from '../actions/pins';

const Pin = () => {
    const dispatch = useDispatch()
    const pins = useSelector(state => state.list)

    useEffect(() => {
        dispatch(getPins(1));
    }, [dispatch])

    if (!pins) {
        return null
    }

    return (
        <div>
            {pins.map(pin => (
                <NavLink key={pin.id} to={`/pins/${pin.id}`}>
                    <h1>{pin.title}</h1>
                </NavLink>
            ))}
        </div>
    )
}

export default Pin;