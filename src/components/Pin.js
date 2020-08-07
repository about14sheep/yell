import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LogoutButton from './LogoutButton'
import MapContainer from './Map'
import { getPins } from '../actions/pins';

const Pin = () => {
    const dispatch = useDispatch()
    const pins = useSelector(state => state.pin.list)
    const geoLoc = useSelector(state => state.pin.geoLoc)

    useEffect(() => {
        if (!geoLoc) return
        dispatch(getPins(geoLoc));
    }, [dispatch, geoLoc])

    return (
        <div>
            <LogoutButton />
            {!pins ? null : pins.map(pin => (
                <NavLink key={pin.id} to={`/pins/${pin.id}`}>
                    <h1>{pin.title}</h1>
                </NavLink>
            ))}
            {!geoLoc || !pins ? null : <MapContainer pins={pins} lat={geoLoc.lat} lng={geoLoc.lng} />}
        </div>
    )
}

export default Pin;