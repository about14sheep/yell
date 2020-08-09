import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import LogoutButton from './LogoutButton'
import MapContainer from './Map'
import { getPins } from '../actions/pins';
import { getPinMessages } from '../actions/messages';
import PinChat from './PinChat';

const Pin = () => {
    const dispatch = useDispatch()
    const pins = useSelector(state => state.pin.list)
    const geoLoc = useSelector(state => state.pin.geoLoc)

    useEffect(() => {
        if (pins) pins.forEach(pin => dispatch(getPinMessages(pin.id)))
    }, [dispatch, pins])

    useEffect(() => {
        if (!geoLoc) return
        dispatch(getPins(geoLoc));

    }, [dispatch, geoLoc])

    return (
        <main className='main_page'>
            <div>
                <LogoutButton />
                {!pins ? null : pins.map(pin => (
                    <NavLink key={pin.id} to={{ pathname: `/pins/${pin.id}`, title: `${pin.title}` }}>
                        <h1>{pin.title}</h1>
                    </NavLink>
                ))}
            </div>
            <div>
                {!geoLoc || !pins ? null : <MapContainer pins={pins} lat={geoLoc.lat} lng={geoLoc.lng} />}
            </div>
            <div>
                <Route path='/pins/:id' render={props => <PinChat {...props} />} />
            </div>
        </main>

    )
}

export default Pin;