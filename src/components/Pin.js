import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LogoutButton from './LogoutButton'
import { getPins } from '../actions/pins';

const Pin = () => {
    const dispatch = useDispatch()
    const pins = useSelector(state => state.pin.list)
    const geoLoc = useSelector(state => state.pin.geoLoc)

    useEffect(() => {
        if (!geoLoc) return
        dispatch(getPins(geoLoc));
    }, [geoLoc])

    return (
        <div>
            <LogoutButton />
            {!pins ? null : pins.map(pin => (
                <NavLink key={pin.id} to={`/pins/${pin.id}`}>
                    <h1>{pin.title}</h1>
                </NavLink>
            ))}
        </div>
    )
}

export default Pin;